import type { SupplyChainNode, SupplyChainEdge } from '@/types';

interface CascadeValidationInput {
  nodes: SupplyChainNode[];
  edges: SupplyChainEdge[];
}

interface DisruptionValidationInput {
  disruptionLevels: { name: string; disruptionLevel: number }[];
}

interface SortValidationInput {
  dates: string[];
  label: string;
}

function assertEdgeRefsValid(nodes: SupplyChainNode[], edges: SupplyChainEdge[]): void {
  const nodeIds = new Set(nodes.map((n) => n.id));
  for (const edge of edges) {
    if (!nodeIds.has(edge.source)) {
      throw new Error(`Edge references unknown source node: "${edge.source}"`);
    }
    if (!nodeIds.has(edge.target)) {
      throw new Error(`Edge references unknown target node: "${edge.target}"`);
    }
  }
}

function assertDisruptionLevelsValid(nodes: SupplyChainNode[]): void {
  for (const node of nodes) {
    if (node.disruptionLevel < 0 || node.disruptionLevel > 100) {
      throw new Error(
        `Node "${node.id}" has disruptionLevel ${node.disruptionLevel}, must be 0-100`,
      );
    }
  }
}

function assertUpstreamDownstreamConsistent(
  nodes: SupplyChainNode[],
  edges: SupplyChainEdge[],
): void {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  for (const edge of edges) {
    const source = nodeMap.get(edge.source);
    const target = nodeMap.get(edge.target);
    if (source && !source.downstream.includes(edge.target)) {
      throw new Error(
        `Edge ${edge.source}→${edge.target} exists but ${edge.source}.downstream does not include "${edge.target}"`,
      );
    }
    if (target && !target.upstream.includes(edge.source)) {
      throw new Error(
        `Edge ${edge.source}→${edge.target} exists but ${edge.target}.upstream does not include "${edge.source}"`,
      );
    }
  }

  for (const node of nodes) {
    for (const upId of node.upstream) {
      const upNode = nodeMap.get(upId);
      if (upNode && !upNode.downstream.includes(node.id)) {
        throw new Error(
          `Node "${node.id}" lists "${upId}" as upstream, but "${upId}" does not list "${node.id}" in downstream`,
        );
      }
    }
    for (const downId of node.downstream) {
      const downNode = nodeMap.get(downId);
      if (downNode && !downNode.upstream.includes(node.id)) {
        throw new Error(
          `Node "${node.id}" lists "${downId}" as downstream, but "${downId}" does not list "${node.id}" in upstream`,
        );
      }
    }
  }
}

function assertNoOrphanNodes(nodes: SupplyChainNode[], edges: SupplyChainEdge[]): void {
  const connected = new Set<string>();
  for (const edge of edges) {
    connected.add(edge.source);
    connected.add(edge.target);
  }
  for (const node of nodes) {
    if (!connected.has(node.id)) {
      throw new Error(`Orphan node: "${node.id}" (${node.label}) has no edges`);
    }
  }
}

function assertNoDuplicateEdges(edges: SupplyChainEdge[]): void {
  const seen = new Set<string>();
  for (const edge of edges) {
    const key = `${edge.source}->${edge.target}`;
    if (seen.has(key)) {
      throw new Error(`Duplicate edge: ${key}`);
    }
    seen.add(key);
  }
}

function assertDisruptionRange(items: DisruptionValidationInput['disruptionLevels']): void {
  for (const item of items) {
    if (item.disruptionLevel < 0 || item.disruptionLevel > 100) {
      throw new Error(
        `"${item.name}" has disruptionLevel ${item.disruptionLevel}, must be 0-100`,
      );
    }
  }
}

function assertChronologicallySorted(input: SortValidationInput): void {
  for (let i = 1; i < input.dates.length; i++) {
    if (input.dates[i] <= input.dates[i - 1]) {
      throw new Error(
        `${input.label}: date "${input.dates[i]}" at index ${i} is not after "${input.dates[i - 1]}" at index ${i - 1}`,
      );
    }
  }
}

export function runDataValidation(input: CascadeValidationInput): void {
  assertEdgeRefsValid(input.nodes, input.edges);
  assertDisruptionLevelsValid(input.nodes);
  assertUpstreamDownstreamConsistent(input.nodes, input.edges);
  assertNoOrphanNodes(input.nodes, input.edges);
  assertNoDuplicateEdges(input.edges);
}

export function runDisruptionValidation(input: DisruptionValidationInput): void {
  assertDisruptionRange(input.disruptionLevels);
}

export function runSortValidation(input: SortValidationInput): void {
  assertChronologicallySorted(input);
}
