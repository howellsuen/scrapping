import {
    STATE_CLIENT,
    PAGE_PROFILE
  } from '../../fixtures/utilities/util'
  import HeaderCheck from '../../fixtures/utilities/HeaderUtil'
  
  export function headerTestForProfile() {
    describe(`Header Unit Test for Home Page (Index Page) :: ${STATE_CLIENT}`, () => {
      HeaderCheck(STATE_CLIENT, PAGE_PROFILE)
    })
  }
  
  headerTestForProfile()
