import { iterateEachLocale, PAGE_BLOG_INDEX,STATE_CLIENT  } from '../../fixtures/utilities/util'
import { testBlogIndexPage } from '../../fixtures/utilities/BlogUtil'


iterateEachLocale(STATE_CLIENT, PAGE_BLOG_INDEX, false, testBlogIndexPage)