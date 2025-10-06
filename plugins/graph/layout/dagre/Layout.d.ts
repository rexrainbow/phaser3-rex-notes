import Graph from '../../graph/Graph';

export default Layout;

declare namespace Layout {

}

declare function Layout(
    graph: Graph,
    config?: Record<string, unknown>
): Promise<any>;