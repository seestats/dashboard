import reducer, { initialState } from 'redux/modules/dashboardData'

describe('(Redux) DashboardData', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
