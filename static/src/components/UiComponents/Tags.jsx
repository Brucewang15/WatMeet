import './Tags.css'

const Tags = ({ tags }) => {
    console.log(tags)
    const ShouldDisplay = Array.isArray(tags) && tags.length !== 0
    return <>
        {ShouldDisplay && <div className="allTags">
            Tags:
            {tags.map((tag, index) => (
                <div key={index} className="tag">
                    {tag}
                </div>
            ))}
        </div>}
    </>

}
export default Tags