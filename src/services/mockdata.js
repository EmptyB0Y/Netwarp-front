export const getPosts = () =>{
    let posts = []

    let model = {
        ProfileId: 0,
        MissionId: 0,
          content: "",
          topic: ""
    }

    for(let i=0; i< 5; i++){
        model = {
            ProfileId:  (Math.random() + 1),
            MissionId:  (Math.random() + 1),
              content:  (Math.random() + 1).toString(36).substring(7),
              topic:  (Math.random() + 1).toString(36).substring(7)
        }
        posts.push(model);
    }

    return posts
}