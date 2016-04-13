// dependencies
import npmRunScript from 'npm-run-script';

function normalize(value = '') {
  if (value.length === 0) {
    throw new SyntaxError('right literal is undefined');
  }
  if (value === 'undefined') {
    return undefined;
  }

  return value;
}

function evaluate(argv) {
  const args = argv.slice();
  if (args.length < 2) {
    throw new SyntaxError(`expected argv.length 2 or greater than(actual ${args.length})`);
  }

  const left = args.shift();
  const operator = (args[0].match(/^(is|isnt)$/) || [])[0];
  let right = null;
  if (operator) {
    args.shift();
    right = normalize(args.shift());
  }

  const isLongSyntax = args[0] === 'then';
  const trueScript = isLongSyntax ? args[1] : args[0];
  const falseScript = (isLongSyntax ? args[3] : args[1]) || 'exit 0';
  if (trueScript === undefined) {
    throw new SyntaxError('trueScript is undefined');
  }
  if (isLongSyntax && args[2] === 'else' && args[3] === undefined) {
    throw new SyntaxError('falseScript is undefined');
  }

  return {
    left,
    operator,
    right,
    trueScript,
    falseScript,
  };
}

/**
* @module npmStatement
* @param {string[]} argv - a command line arguments
* @param {object} [options] - a npm-run-script options
* @param {boolean} [inverse=true] - if true, it reverses the condition
* @returns {childProcess} child
*/
export default function npmStatement(argv, options = {}, inverse = false) {
  const env = options.env || process.env;

  const statement = evaluate(argv);

  let actual = false;
  if (statement.operator === 'is') {
    actual = env[statement.left] === statement.right;
  } else if (statement.operator === 'isnt') {
    actual = env[statement.left] !== statement.right;
  } else if (env[statement.left]) {
    actual = true;
  }

  if (inverse) {
    actual = !actual;
  }

  const actualExpression = actual ? statement.trueScript : statement.falseScript;
  return npmRunScript(actualExpression, options);
}

export { npmStatement as if };
export function unless(argv, options) {
  return npmStatement(argv, options, true);
}
