import CheckSEOForBlogArticlesClient from '../SEO.blogArticle.client.spec'
import CheckSEOForBlogArticlesServer from '../SEO.blogArticle.server.spec'
import CheckSEOForBlogIndexClient from '../SEO.blogIndex.client.spec'
import CheckSEOForBlogIndexServer from '../SEO.blogIndex.server.spec'
import CheckSEOForGlobalFeature from '../SEO.global.spec'
import CheckSEOForIndexPages from '../SEO.index.spec'
import CheckSEOForSubPagesClient from '../SEO.subpage.client.spec'
import CheckSEOForSubPagesServer from '../SEO.subpage.server.spec'
import CheckSEOForToolsClient from '../SEO.tool.client.spec'
import CheckSEOForToolsServer from '../SEO.tool.server.spec'

/** Don't run this unless specified Language env*/
/** TODO: need to move all the test's get blog data to be separated  */
CheckSEOForBlogArticlesClient()
CheckSEOForBlogArticlesServer()
CheckSEOForBlogIndexClient()
CheckSEOForBlogIndexServer()
CheckSEOForGlobalFeature()
CheckSEOForIndexPages()
CheckSEOForSubPagesClient()
CheckSEOForSubPagesServer()
CheckSEOForToolsClient()
CheckSEOForToolsServer()
