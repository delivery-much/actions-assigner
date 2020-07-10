const { context, getOctokit } = require('@actions/github')

/**
 * Creates Octokit instance and run assign and review.
 *
 * @param {string} token - GitHub token
 * @param {string} team - GitHub organization team
 */
const handle = async (token, team) => {
  if (context.eventName === 'pull_request') {
    const octokit = getOctokit(token)
    await assign(octokit)
    await review(octokit, team)
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
 * Request PR review for given team.
 *
 * @param {Octokit} octokit - Octokit instance
 * @param {string} team - GitHub organization team
 */
const review = async (octokit, team) => {
  try {
    const { owner, repo } = context.issue
    await octokit.pulls.requestReviewers({
      owner: owner,
      repo: repo,
      pull_number: context.payload.pull_request.number,
      team_reviewers: [team]
    })
  } catch (err) {
    throw new Error(`Couldn't request review for ${team}.\n  Error: ${err}`)
  }
}

module.exports = { handle }
