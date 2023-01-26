const { context, getOctokit } = require('@actions/github')

/**
 * Creates Octokit instance and run assign and review.
 *
 * @param {string} token - GitHub token
 * @param {string} reviewers - GitHub usernames
 * @param {string} teamReviewers - GitHub teams
 */
const handle = async (token, reviewers, teamReviewers) => {
  if (/^pull_request(_target)?$/.test(context.eventName)) {
    const octokit = getOctokit(token)
    await assign(octokit)
    if (reviewers || teamReviewers) await review(octokit, reviewers, teamReviewers)
  } else {
    throw new Error('Sorry, this Action only works with pull requests.')
  }
}

/**
 * Auto assign pull requests.
 *
 * @param {Octokit} octokit - Octokit instance
 */
const assign = async (octokit) => {
  try {
    const { owner, repo, number } = context.issue
    await octokit.issues.addAssignees({
      owner: owner,
      repo: repo,
      issue_number: number,
      assignees: [context.actor]
    })
  } catch (err) {
    throw new Error(`Couldn't assign pull request.\n  Error: ${err}`)
  }
}

/**
 * Request PR review to given reviewers.
 *
 * @param {Octokit} octokit - Octokit instance
 * @param {string} reviewers - GitHub usernames
 * @param {string} teamReviewers - GitHub teams
 */
const review = async (octokit, reviewers, teamReviewers) => {
  try {
    const { owner, repo } = context.issue
    await octokit.pulls.requestReviewers({
      owner: owner,
      repo: repo,
      pull_number: context.payload.pull_request.number,
      reviewers: reviewers.split(',').filter(x => x !== context.actor) || undefined,
      team_reviewers: teamReviewers.split(',') || undefined
    })
  } catch (err) {
    throw new Error(`Couldn't request review.\n  Error: ${err}`)
  }
}

module.exports = { handle }
