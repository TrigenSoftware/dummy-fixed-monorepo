import { foo } from '@trigensoftware/dummy-fixed-monorepo-foo'

export function bar() {
  return `bar(${String(foo()).trim()})`
}
