import test from 'ava';
import githubRepositories from '.';

test('user with more than 100 repos', async t => {
	const repos = await githubRepositories('kevva');

	t.truthy(repos.length);
	t.true(repos.length > 100);
});

test('organization using organization api', async t => {
	const repos = await githubRepositories('github');

	t.truthy(repos.length);
});

test('user with lower than 100 repos', async t => {
	const repos = await githubRepositories('octocat');

	t.truthy(repos.length);
	t.true(repos.length < 100);
});

test('two requests should return same data', async t => {
	const [first, second] = await Promise.all([
		await githubRepositories('octocat'),
		await githubRepositories('octocat')
	]);

	t.truthy(first.length);
	t.truthy(second.length);
	t.deepEqual(first, second);
});

test('`sort` option', async t => {
	const repos = await githubRepositories('kevva', {sort: 'created'});
	t.is(repos[repos.length - 1].name, 'download');
});

test('`direction` option', async t => {
	const [repo] = await githubRepositories('kevva', {direction: 'asc', sort: 'created'});
	t.is(repo.name, 'download');
});
