/* description: Parse nodes and edges with attributes; expand A -> B -> C; support '*' as anonymous dummy */

/* ===========================
 * Lexical grammar
 * =========================== */
%lex

%%

[ \t\f]+                                        /* skip horizontal whitespace only */
\r\n|\r|\n                                      return 'EOL'

"#".*                                           /* skip line comments starting with # */
"//".*                                          /* skip line comments starting with // */
"/*"([^*]|\*+[^*/])*\*+"/"                      /* skip C-style block comments */

"NODE"                                          return 'NODE'     /* defaults for nodes (UPPERCASE) */
"EDGE"                                          return 'EDGE'     /* defaults for edges (UPPERCASE) */

"["                                             return '['
"]"                                             return ']'
","                                             return ','
"="                                             return '='
";"                                             return ';'

"->"                                            return '->'
"*>"                                            return 'INVIS_ARROW'
\*[A-Za-z0-9_]+                                 return 'STAR_NAMED'
"*"                                             return 'STAR'

\b0x[0-9A-Fa-f]+\b                              return 'HEXNUMBER'
\-?[0-9]+(\.[0-9]+)?\b                          return 'NUMBER'         /* integer/float */
\"(\\.|[^\"\\])*\"|\'(\\.|[^\'\\])*\'           return 'QUOTED_STRING'
[A-Za-z_](?:[A-Za-z0-9_-]|\.[A-Za-z0-9_-])*     return 'IDENT'          /* bare identifiers */

<<EOF>>                                         return 'EOF'
.                                               return 'INVALID'

/lex

%{
  // ----- module-scope state -----
  var nodesMap, edges, dummyAutoId, edgeAutoId, currentDefaults, namedDummyMap;
  // --- switches & indices ---
  var allowParallelEdges;               // default true
  var edgeKeyToIndexMap;                // (sourceId,targetId) -> edges[] index

  function resetState() {
    nodesMap = Object.create(null);
    edges = [];
    dummyAutoId = 0;   // for anonymous dummy nodes: _d1, _d2, ...
    edgeAutoId  = 0;   // for edges: _e1, _e2, ...
    currentDefaults = {
      node: {},
      nodeLayout: {},
      edge: {}
    };
    allowParallelEdges = false;
    edgeKeyToIndexMap = Object.create(null);
    namedDummyMap = Object.create(null);
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
  function splitNodeParameters(parameters) {
    const normalParameters = {};
    const elkLayoutOptions = {};
  
    for (const key in parameters) {
      if (!Object.prototype.hasOwnProperty.call(parameters, key)) {
        continue;
      }
  
      const value = parameters[key];
      if (key.startsWith('elk.')) {
        elkLayoutOptions[key] = value;
      } else {
        normalParameters[key] = value;
      }
    }
  
    return {
      parameters: normalParameters,
      layoutOptions: elkLayoutOptions
    };
  }


  function makeEdgeKey(sourceId, targetId) {
    return sourceId + '->' + targetId;
  }
  var dedupePolicy = "first-wins";

  /**
   * Ensure a node exists.
   * - If creating a **dummy** (newParameters && newParameters.$dummy === true):
   *     DO NOT seed with NODE defaults; start from {} and only set $dummy flag (+ any explicit fields).
   * - Else (normal node first creation): seed with NODE defaults, then merge explicit params.
   */
  function ensureNode(nodeId, newParameters) {
    var isDummyCreation = !!(newParameters && newParameters.$dummy === true);
    var nodeItem = nodesMap[nodeId];
    if (!nodeItem) {
      // seed parameters: {} for dummy, NODE defaults for normal nodes
      var seed = (isDummyCreation)? {} : shallowCopy(currentDefaults.node);
      nodeItem = { id: nodeId, parameters: seed, layoutOptions: {} };
      if (!isDummyCreation) {
        mergeInto(nodeItem.layoutOptions, currentDefaults.nodeLayout);
      }
      nodesMap[nodeId] = nodeItem;
    }
    if (newParameters && typeof newParameters === 'object') {
      mergeInto(nodeItem.parameters, newParameters);
    }
    return nodeItem;
  }

  /** Create a fresh anonymous dummy node id like _d1, and register it as dummy (no NODE defaults). */
  function createAnonymousDummyNode() {
    dummyAutoId += 1;
    var dummyNodeId = "_d$" + String(dummyAutoId);
    ensureNode(dummyNodeId, { $dummy: true });
    return dummyNodeId;
  }

  function getOrCreateNamedDummy(label) {
    var id = namedDummyMap[label];
    if (id) {
      return id
    };
  
    id = '_d#' + label;
    namedDummyMap[label] = id;
  
    ensureNode(id, { $dummy: true });
    return id;
  }

  /** Create a fresh edge id like _e1. */
  function createEdgeId() {
    edgeAutoId += 1;
    return "_e" + String(edgeAutoId);
  }

  /**
   * Push an edge with a generated id and merged parameters:
   * effectiveEdgeParams = merge(currentDefaults.edge, edgeParameters)
   */
  var dedupePolicy = "first-wins";
  function addEdge(sourceId, targetId, edgeParameters) {
    var key = makeEdgeKey(sourceId, targetId);

    if (!allowParallelEdges) {
      var existIdx = edgeKeyToIndexMap[key];
      if (existIdx != null) {
        if (dedupePolicy === 'last-wins') {
          edges[existIdx].parameters = merged(currentDefaults.edge, edgeParameters || {});
        }
        return;
      }
    }

    var effective = merged(currentDefaults.edge, edgeParameters || {});
    edges.push({
      id: createEdgeId(),
      sourceId: sourceId,
      targetId: targetId,
      parameters: effective
    });

    edgeKeyToIndexMap[key] = edges.length - 1;
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

  function unquote(text) { 
    return text.slice(1, -1); 
  }

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

line_end
  : EOL
  | ';'
  ;

blank_line
  : EOL
  ;

statements
  : /* empty */
  | statements blank_line
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

opt_eol
  : /* empty */
  | EOL
  | opt_eol EOL
  ;

sep
  : ','
  | ',' opt_eol
  ;

attribute_list
  : attribute
      {
        var o = {};
        o[$1.key] = $1.value;
        $$ = o;
      }
  | attribute_list sep attribute
      {
        $1[$3.key] = $3.value;
        $$ = $1;
      }
  | attribute_list sep
      {
        /* trailing comma: nothing to add */
        $$ = $1;
      }
  ;

attribute_block
  : '[' opt_eol attribute_list opt_eol ']'
      { $$ = $3; }
  ;

defaults_statement
  : 'NODE' attribute_block opt_semicolon
      {
        var parts = splitNodeParameters($2);
        mergeInto(currentDefaults.node, parts.parameters);
        mergeInto(currentDefaults.nodeLayout, parts.layoutOptions);
      }
  | 'EDGE' attribute_block opt_semicolon
      { 
        mergeInto(currentDefaults.edge, $2); 
      }
  ;

/* Node: IDENT [ attr_list ] line_end | IDENT line_end */
node_statement
  : IDENT attribute_block line_end
      { 
        var parts = splitNodeParameters($2);
        var n = ensureNode($1, parts.parameters);
        mergeInto(n.layoutOptions, parts.layoutOptions);
      }
  | IDENT line_end
      { 
        ensureNode($1, {}); 
      }
  | STAR_NAMED attribute_block line_end
      {
        var label = yytext.slice(1);
        var id = getOrCreateNamedDummy(label);
        var parts = splitNodeParameters($2);
        var n = ensureNode(id, parts.parameters);
        mergeInto(n.layoutOptions, parts.layoutOptions);
      }
  ;

/* Edge chain: node_ref -> node_ref (-> node_ref)* */
edge_statement
  : edge_chain edge_attribute_opt line_end
      {
        var chainParams = $2 || null;
        var chainBase = merged(currentDefaults.edge, chainParams);
        for (var i = 0; i < $1.edgePairs.length; i += 1) {
          var pair = $1.edgePairs[i];
          var perPair = pair.$invisible
            ? merged(chainBase, { render: false, $invisible: true, 'elk.edge.thickness': 0 })
            : chainBase;
          addEdge(pair.sourceId, pair.targetId, perPair);
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
  | node_ref INVIS_ARROW node_ref
      {
        ensureNode($1.id, $1.parameters);
        ensureNode($3.id, $3.parameters);
        $$ = {
          lastNodeId: $3.id,
          edgePairs: [{ sourceId: $1.id, targetId: $3.id, $invisible: true }]
        };
      }
  | edge_chain '->' node_ref
      {
        ensureNode($3.id, $3.parameters);
        $1.edgePairs.push({ sourceId: $1.lastNodeId, targetId: $3.id });
        $$ = { lastNodeId: $3.id, edgePairs: $1.edgePairs };
      }
  | edge_chain INVIS_ARROW node_ref
      {
        ensureNode($3.id, $3.parameters);
        $1.edgePairs.push({ sourceId: $1.lastNodeId, targetId: $3.id });
        $$ = { lastNodeId: $3.id, edgePairs: $1.edgePairs };
      }
  ;

edge_attribute_opt
  : /* empty */         { $$ = null; }
  | attribute_block     { $$ = $1; }
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
  | STAR_NAMED
      {
        var label = yytext.slice(1);
        var id = getOrCreateNamedDummy(label);
        $$ = { id: id, parameters: { $dummy: true } };
      }
  ;

attribute_key
  : IDENT           { $$ = yytext; }
  | QUOTED_STRING   { $$ = unquote(yytext); }
  ;

attribute
  : attribute_key '=' attribute_value
      { $$ = { key: $1, value: $3 }; }
  ;

attribute_value
  : NUMBER         { $$ = Number(yytext); }
  | HEXNUMBER      { $$ = parseInt(yytext, 16); }
  | QUOTED_STRING  { $$ = unquote(yytext); }
  | IDENT          { $$ = yytext; }
  ;
