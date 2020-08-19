<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="文章标题" width="500">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="标签" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="阅读量" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.view_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="点赞量" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.like_number }}
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.create_time | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="更新时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.update_time | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布状态" width="110" align="center">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.release" type="primary" size="small" @click="releaseClick(true, scope.row.blogId, scope.$index)">发布</el-button>
          <el-button v-else type="danger" size="small" @click="releaseClick(false, scope.row.blogId, scope.$index)">撤销</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="getDetail(scope.row.blogId)">查看</el-button>
          <el-button type="text" size="small" @click="toEdit(scope.row.blogId)">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getBlogsList, changeRelease, getBlogDetail } from '@/api/blog'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'Article',
  data() {
    return {
      listLoading: true,
      list: null,
      pageIndex: 1,
      pageSize: 20
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      try {
        const result = await getBlogsList(this.pageIndex, this.pageSize)
        this.list = result.data
        this.pageIndex += 1
        this.listLoading = false
      } catch (error) {
        console.log(error)
      }
    },
    async releaseClick(release, blogId, index) {
      try {
        await changeRelease({ release, blogId })
        Message.success('修改状态成功')
        this.list[index].release = release ? 1 : 0
      } catch (error) {
        console.log(error)
      }
    },
    async getDetail(blogId) {
      const result = await getBlogDetail(blogId)
      MessageBox.alert(result.data.content_html, result.data.title, {
        dangerouslyUseHTMLString: true
      })
    },
    toEdit(blogId) {
      this.$router.push({
        path: '/edit',
        query: {
          id: blogId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
