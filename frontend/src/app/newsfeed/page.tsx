import Navbar from '../components/navbar/page'
import NewsFeed from '../components/newsfeed-post/page'
import InputPostPage from '../components/input-post/page'

const NewsfeedPage = () => {
  return (
    <>
        <Navbar />
        <InputPostPage />
        <NewsFeed />
    </>
  )
}

export default NewsfeedPage