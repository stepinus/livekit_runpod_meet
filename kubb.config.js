import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig({
  input: {
    path: './runpod/runpod_api.json',
  },
  output: {
    path: './runpod/gen',
    clean: true,
    // Удаляет расширения из импортов
    extension: {
      '.ts': '',
    },
  },
  plugins: [
    pluginOas(),
    pluginTs({
      include: [
        { type: 'tag', pattern: 'pods' }
      ],
    }),
    pluginReactQuery({
      output: {
        path: './hooks',
   
      },
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Hooks`,
      },
      include: [
        { type: 'tag', pattern: 'pods' }
      ],
      client: {
        dataReturnType: 'full',
      },
      mutation: {
        methods: [ 'post', 'put', 'delete' ],
      },
      infinite: false,
      query: {
        methods: [ 'get' ],
        importPath: "@tanstack/react-query"
      },
      suspense: {},
    }),
  ],
})