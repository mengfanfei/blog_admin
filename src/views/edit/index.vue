<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="博客标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="博客简介">
        <el-input v-model="form.summary" type="textarea" />
      </el-form-item>
      <el-form-item label="博客类型">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option label="JavaScript" value="JavaScript" />
          <el-option label="Vue" value="Vue" />
          <el-option label="React" value="React" />
          <el-option label="nodejs" value="nodejs" />
          <el-option label="小程序" value="小程序" />
          <el-option label="HTML" value="HTML" />
          <el-option label="CSS" value="CSS" />
          <el-option label="Git" value="Git" />
          <el-option label="HTTP" value="HTTP" />
          <el-option label="TypeScript" value="TypeScript" />
          <el-option label="服务器" value="服务器" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否发布">
        <el-switch v-model="form.release" />
      </el-form-item>
    </el-form>
    <mavon-editor
      ref="markdownEditor"
      v-model="form.content_markdown"
      :ishljs="true"
      @change="handleMarkdownChange"
      @save="handleEditorSave"
      @imgAdd="imgAdd"
      @imgDel="imgDel"
    />
  </div>
</template>

<script>
/* eslint-disable */
import { createBlog, getBlogEdit, updateBlog } from "@/api/blog"
import { uploadImg } from "@/api/utils"
import { Message } from "element-ui"
export default {
  name: "Edit",
  data() {
    return {
      form: {
        title: "",
        summary: "",
        type: "",
        release: false,
        content_html: "",
        content_markdown: "",
        picture: "",
      },
      blogId: null,
      pictureList: []
    }
  },
  watch: {
    pictureList() {
      this.form.picture = this.pictureList[0]
    }
  },
  created() {
    if (this.$route.query.id) {
      this.blogId = this.$route.query.id
      this.getEdit(this.$route.query.id)
    }
  },
  methods: {
    async getEdit(blogId) {
      try {
        const result = await getBlogEdit(blogId)
        this.form = {
          title: result.data.title,
          summary: result.data.summary,
          type: result.data.type,
          release: result.data.release,
          content_html: "",
          content_markdown: result.data.content_markdown,
          picture: result.data.picture,
        }
      } catch (error) {
        console.log(error)
      }
    },

    handleMarkdownChange(value, render) {
      this.form.content_html = render
    },
    async handleEditorSave() {
      try {
        if (this.blogId) {
          this.form['blogId'] = this.blogId
          await updateBlog(this.form)
          Message.success("更新博客成功！")
        } else {
          await createBlog(this.form)
          Message.success("新建博客成功！")
          this.form = {
            title: "",
            summary: "",
            type: "",
            release: false,
            content_html: "",
            content_markdown: "",
            picture: "",
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      const formdata = new FormData()
      formdata.append("file", $file)
      uploadImg(formdata).then((res) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        this.$refs.markdownEditor.$img2Url(
          pos,
          res.data.url
        )
        this.pictureList.push(res.data.url)
      })
      // axios({
      //   url: "server url",
      //   method: "post",
      //   data: formdata,
      //   headers: { "Content-Type": "multipart/form-data" },
      // }).then((url) => {
      //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //   /**
      //    * $vm 指为mavonEditor实例，可以通过如下两种方式获取
      //    * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
      //    * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
      //    */
      //   $vm.$img2Url(pos, url);
      // });
    },
    imgDel(pos) {
      console.log(pos)
    },
  },
}
</script>

<style lang="scss" scoped>
.btn {
  padding: 5px 10px;
  background: red;
  border: 1px solid red;
  color: #ffffff;
}
.btn:hover {
  background: transparent;
  color: red;
}
.line {
  text-align: center;
}
</style>
