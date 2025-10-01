/* description: Parse nodes and edges with attributes; expand A -> B -> C; support '*' as anonymous dummy */

/* ===========================
 * Lexical grammar
 * =========================== */
%lex
%%

\s+                                   /* skip whitespace */
"#".*                                 /* skip line comments starting with # */

"NODE"                                return 'NODE'     /* defaults for nodes (UPPERCASE) */
"EDGE"                                return 'EDGE'     /* defaults for edges (UPPERCASE) */

"->"                                  return '->'
"["                                   return '['
"]"                                   return ']'
","                                   return ','
"="                                   return '='
";"                                   return ';'

"*"                                   return 'STAR'

\b0x[0-9A-Fa-f]+\b                    return 'HEXNUMBER'
\-?[0-9]+(\.[0-9]+)?\b                return 'NUMBER'         /* integer/float */
\"(\\.|[^\"\\])*\"|\'(\\.|[^\'\\])*\' return 'QUOTED_STRING'
[A-Za-z_][A-Za-z0-9_-]*               return 'IDENT'          /* bare identifiers */

<<EOF>>                               return 'EOF'
.                                     return 'INVALID'

/lex

%{
  // ----- module-scope state -----
  var nodesMap, edges, dummyAutoId, currentDefaults;

  function resetState() {
    nodesMap = Object.create(null);
    edges = [];
    dummyAutoId = 0;
    currentDefaults = {
      node: {},   // defaults applied when a node is first created
      edge: {}    // defaults applied when an edge is created
    };
  }

  function shallowCopy(obj) {
    var out = {};
    for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) out[k] = obj[k];
    return out;
  }
  function mergeInto(target, src) {
    if (!src) return target;
    for (var k in src) if (Object.prototype.hasOwnProperty.call(src, k)) target[k] = src[k];
    return target;
  }
  function merged(a, b) {
    return mergeInto(mergeInto({}, a || {}), b || {});
  }

  /**
   * Ensure a node exists. On first creation, seed with NODE defaults, then merge explicit params.
   * On subsequent calls, merge new explicit params over existing (non-retroactive defaults).
   */
  function ensureNode(nodeId, newParameters) {
    var isDummyCreation = !!(newParameters && newParameters.$dummy === true);
    var nodeItem = nodesMap[nodeId];
    if (!nodeItem) {
      // seed parameters: {} for dummy, NODE defaults for normal nodes
      var seed = isDummyCreation ? {} : shallowCopy(currentDefaults.node);
      nodeItem = { id: nodeId, parameters: seed };
      nodesMap[nodeId] = nodeItem;
    }
    if (newParameters && typeof newParameters === 'object') {
      // merge caller-provided parameters; dummy=true will be set/kept
      mergeInto(nodeItem.parameters, newParameters);
    }
    return nodeItem;
  }

  function createAnonymousDummyNode() {
    dummyAutoId += 1;
    var id = "_d" + String(dummyAutoId);
    ensureNode(id, { $dummy: true });
    return id;
  }

  function addEdge(sourceId, targetId, edgeParameters) {
    edges.push({ sourceId: sourceId, targetId: targetId, parameters: edgeParameters || {} });
  }

  function getNodesArray() {
    var out = [];
    for (var id in nodesMap) {
      if (Object.prototype.hasOwnProperty.call(nodesMap, id)) {
        out.push(nodesMap[id]);
      }
    }
    return out;
  }

  function unquote(text) { return text.slice(1, -1); }

%}

/* ===========================
 * Grammar
 * =========================== */

%start document

%%

document
  : init statements EOF
      {
        return {
          nodes: getNodesArray(),
          edges: edges
        };
      }
  ;

init
  : /* empty */
      { resetState(); }
  ;

statements
  : /* empty */
  | statements statement
  ;

statement
  : defaults_statement
  | node_statement
  | edge_statement   
  | ';'
  ;

opt_semicolon
  : /* empty */
  | ';'
  ;

defaults_statement
  : 'NODE' '[' attribute_list ']' opt_semicolon
      { mergeInto(currentDefaults.node, $3); }
  | 'EDGE' '[' attribute_list ']' opt_semicolon
      { mergeInto(currentDefaults.edge, $3); }
  ;

/* Node: IDENT [ attr_list ] | IDENT ;*/
node_statement
  : IDENT '[' attribute_list ']' opt_semicolon
      { ensureNode($1, $3); }
  | IDENT ';'
      { ensureNode($1, {}); }
  ;

/* Edge chain: node_ref -> node_ref (-> node_ref)* */
edge_statement
  : edge_chain edge_attribute_opt opt_semicolon
      {
        var chainParams = $2 || null;
        var effectiveEdgeParamsForChain = merged(currentDefaults.edge, chainParams);
        for (var i = 0; i < $1.edgePairs.length; i += 1) {
          var pair = $1.edgePairs[i];
          addEdge(pair.sourceId, pair.targetId, effectiveEdgeParamsForChain);
        }
      }
  ;

edge_chain
  : node_ref '->' node_ref
      {
        ensureNode($1.id, $1.parameters);
        ensureNode($3.id, $3.parameters);
        $$ = {
          lastNodeId: $3.id,
          edgePairs: [{ sourceId: $1.id, targetId: $3.id }]
        };
      }
  | edge_chain '->' node_ref
      {
        ensureNode($3.id, $3.parameters);
        $1.edgePairs.push({ sourceId: $1.lastNodeId, targetId: $3.id });
        $$ = { lastNodeId: $3.id, edgePairs: $1.edgePairs };
      }
  ;

edge_attribute_opt
  : /* empty */                { $$ = null; }
  | '[' attribute_list ']'     { $$ = $2; }
  ;

/* node_ref: IDENT | QUOTED_STRING | STAR */
node_ref
  : IDENT
      { $$ = { id: $1, parameters: {} }; }
  | QUOTED_STRING
      { $$ = { id: unquote(yytext), parameters: {} }; }
  | STAR
      {
        var gen = createAnonymousDummyNode();
        $$ = { id: gen, parameters: { $dummy: true } };
      }
  ;

/* [ key=value (, key=value)* ] */
attribute_list
  : attribute
      { var parametersObject = {}; parametersObject[$1.key] = $1.value; $$ = parametersObject; }
  | attribute_list ',' attribute
      { $1[$3.key] = $3.value; $$ = $1; }
  ;

attribute
  : IDENT '=' attribute_value
      { $$ = { key: $1, value: $3 }; }
  ;

attribute_value
  : NUMBER         { $$ = Number(yytext); }
  | HEXNUMBER      { $$ = parseInt(yytext, 16); }
  | QUOTED_STRING  { $$ = unquote(yytext); }
  | IDENT          { $$ = yytext; }
  ;
