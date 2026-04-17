import { buildCommand } from './node_modules/@opennextjs/cloudflare/dist/cli/commands/build.js';

await buildCommand({ skipNextBuild: true, 'skip-next-build': true });
