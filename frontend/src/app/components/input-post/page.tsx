
const InputPostPage = () => {
    return (
        <div className="input-post-page bg-red-500">
            <form className="input-post-form">
                <div>
                    <label htmlFor="post">Post:</label>
                    <textarea
                        id="post"
                        placeholder="What's on your mind?"
                        required
                    />
                </div>
                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default InputPostPage;