import { describe, expect, test } from "bun:test"
import { NetManager } from "lib/net-manager"

describe("NetManager", () => {
  test("merges networks separated by unrelated networks", () => {
    const manager = new NetManager()
    manager.setConnected(["A", "B"])
    manager.setConnected(["C", "D"])
    manager.setConnected(["E", "F"])

    manager.setConnected(["A", "E"])

    expect(manager.isConnected(["B", "F"])).toBe(true)
    expect(manager.isConnected(["A", "C"])).toBe(false)
  })

  test("merges three or more existing networks in a single setConnected call", () => {
    const manager = new NetManager()
    manager.setConnected(["A", "B"])
    manager.setConnected(["C", "D"])
    manager.setConnected(["E", "F"])

    manager.setConnected(["A", "C", "E"])

    expect(manager.isConnected(["B", "D", "F"])).toBe(true)
  })
})
