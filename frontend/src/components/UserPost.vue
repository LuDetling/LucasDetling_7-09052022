<template>
  <div class="card-post-like">
    <div class="like-dislike">
        <button>like</button>
        <button>dislike</button>
    </div>
    <div class="card-post">
        <img src="../assets/logo.png" alt="">
        <div class="post">
            <h1>Title of post</h1>
            <p>Paragraph of post</p>
        </div>
    </div>
  </div>
</template>

<style lang="scss">
    .card-post-like {
        display: flex;
        margin: auto;
        width: 600px;
        padding: .5rem;
        background: #2c3e50;
        .like-dislike {
            border-right: 1px solid white;
            padding-right: .5rem;
            button {
                display: block;
                cursor: pointer;
            }
        }
        .card-post {
            display: flex;
            img {
                width: 100px;
                padding: 0 .5rem;
                border-right: 1px solid white;
            }
            .post {
                padding-left: .5rem;
                h1 {
                    margin: 0;
                    color: white;
                }
                p {
                    color: white;
                    margin: 0;
                    text-align: start;
                }
            }
        }
    }
</style>
