// Copyright 2018 VMware, Inc.
// SPDX-License-Identifier: BSD-2-Clause

const gosec = require('../gosec/gosec')
const fs = require('fs-extra')

describe('Spawn gosec tests', () => {
  test('Empty input for gosec', async () => {
    const gosecResult = await gosec('', [])
    expect(gosecResult).toBeFalsy()
  })

  test('Run gosec on non go files', async () => {
    const gosecResult = await gosec('test/fixtures/go/src', ['test/fixtures/go/src/non_go_files/hello_world.py'])
    expect(gosecResult).toBeFalsy()
  })

  test('Run gosec on a go file without security problems', async () => {
    const gosecResult = await gosec('test/fixtures/go/src', ['test/fixtures/go/src/secure_go_files/hello_world.go'])
    expect(gosecResult.Issues.length).toEqual(0)
  })

  test('Run gosec on go problematic file', async () => {
    const gosecResult = await gosec('test/fixtures/go/src', ['test/fixtures/go/src/bad_files/bad_test_file.go'])
    expect(gosecResult.Stats.found).toBeGreaterThan(0)
  })

  afterEach(() => {
    fs.remove('test/fixtures/go/src/gosec.json')
  })
})