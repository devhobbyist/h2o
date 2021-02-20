import { FormInstance } from 'antd'

import { AdvancedBudgetFormFields } from '../../models/forms-fields/advanced-budget-form'
import { Step } from '../../models/step'
import BudgetAdvancedForm from '../forms/BudgetAdvancedForm'

export function advancedContractStep({
  form,
}: {
  form: FormInstance<AdvancedBudgetFormFields>
}): Step {
  return {
    title: 'Advanced',
    validate: form.validateFields,
    content: BudgetAdvancedForm({
      props: { form },
      header: 'Advanced tuning',
    }),
    info: [
      "Your contract's overflow is claimable by anyone who redeems your Tickets. Tickets are handed out to everyone who makes payments, but you should also reserve some tokens for yourself so that you benefit from your own surplus.",
      "You can mint a budgeting period's reserved tickets once it expires.",
      '---',
      'You can also pre-program a donation from your overflow, like for Gitcoin grant matching.',
      '---',
      'Lastly, the discount rate can give earlier adopters a better rate when claiming overflow.',
      'For example, if your discount rate is set to 97%, then someone who pays 100 towards your next budgeting period will only receive 97% the amount of tickets received by someone who paid 100 towards the current budgeting period.',
      'Effectively this gives people who believe your cumulative overflow will increase over time an added incentive to pay you today, HODL their tickets, and redeem them at a future date.',
    ],
  }
}
