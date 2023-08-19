export function insertAfter(node: Node, ref: Node) {
  ref.parentNode?.insertBefore(node, ref.nextSibling);
}
