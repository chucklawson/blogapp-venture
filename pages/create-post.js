import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useRef, React } from "react";
import { API, Storage } from "aws-amplify";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import { createPost } from "../src/graphql/mutations";

const initialState = { title: "", content: "" };
function CreatePost() {
    const [post, setPost] = useState(initialState);
    const { title, content } = post;
    const router = useRouter();
  
    function onChange(e) {
      setPost(() => ({
        ...post,
        [e.target.name]: e.target.value,
      }));
    }

    async function createNewPost() {
        if (!title || !content) return;
        const id = uuid();
        post.id = id;
    
        if (image) {
          const filename = `${image.name}_${uuid()}`;
          post.coverImage = filename;
          await Storage.put(filename, image);
        }
    
        await API.graphql({
          query: createPost,
          variables: { input: post },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        //router.push(`/posts/${id}`);
      }

      return(
        <div>
            <h1> Create new Post</h1>
        </div>
      )

}

export default CreatePost