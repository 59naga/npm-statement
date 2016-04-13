// dependencies
import test from 'ava';
import { parse } from 'shell-quote';

// target
import { if as npmIf, unless as npmUnless } from '../src';

// helper
const result = (child) => new Promise((resolve, reject) => {
  child.once('exit', resolve);
  child.once('error', reject);
});

// environment
const options = { stdio: 'ignore' };

// specs
test('trueExpression', async (t) => {
  const command = parse("NODE_ENV 'exit 1'");

  t.true((await result(npmIf(command, options))) === 0);
  t.true((await result(npmUnless(command, options))) === 1);
});

test('falseExpression', async (t) => {
  const command = parse("NODE_ENV 'exit 0' 'exit 1'");

  t.true((await result(npmIf(command, options))) === 1);
  t.true((await result(npmUnless(command, options))) === 0);
});

test('coffee-script syntax', async (t) => {
  const command = parse("NODE_ENV then 'exit 0' else 'exit 1'");

  t.true((await result(npmIf(command, options))) === 1);
  t.true((await result(npmUnless(command, options))) === 0);
});

test('is', async (t) => {
  const command = parse("NODE_ENV is production then 'exit 0' else 'exit 1'");
  const opts = { ...options, env: { NODE_ENV: 'production' } };

  t.true((await result(npmIf(command, opts))) === 0);
  t.true((await result(npmUnless(command, opts))) === 1);
});

test('is undefined', async (t) => {
  const command = parse("NODE_ENV is undefined then 'exit 0' else 'exit 1'");
  const opts = { ...options };

  t.true((await result(npmIf(command, opts))) === 0);
  t.true((await result(npmUnless(command, opts))) === 1);
});

test('is not', async (t) => {
  const command = parse("NODE_ENV isnt production then 'exit 0' else 'exit 1'");
  const opts = { ...options, env: { NODE_ENV: 'production' } };

  t.true((await result(npmIf(command, opts))) === 1);
  t.true((await result(npmUnless(command, opts))) === 0);
});

test('syntax erros', (t) => {
  t.throws(
    () => {npmIf([]);},
    'expected argv.length 2 or greater than(actual 0)',
  );
  t.throws(
    () => {npmIf(parse('NODE_ENV'));},
    'expected argv.length 2 or greater than(actual 1)',
  );
  t.throws(
    () => {npmIf(parse('NODE_ENV is'));},
    'right literal is undefined',
  );
  t.throws(
    () => {npmIf(parse('NODE_ENV isnt'));},
    'right literal is undefined',
  );
  t.throws(
    () => {npmIf(parse('NODE_ENV is undefined then'));},
    'trueScript is undefined',
  );
  t.throws(
    () => {npmIf(parse("NODE_ENV is undefined then 'exit 0' else"));},
    'falseScript is undefined',
  );
});
