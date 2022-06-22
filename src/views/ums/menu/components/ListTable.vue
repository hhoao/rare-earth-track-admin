<template>
  <div>
    <el-table
      :data="repository.list"
      stripe
      border
    >
      <el-table-column
        v-for="item in props.items"
        :prop="item.name"
        :key="item.name"
        :label="item.label"
      >
        <template v-if="item.showStyle" #default="scope">
          <template v-if="item.showStyle.type=== 'switch'">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(scope.$index, scope.row)"
            />
          </template>
        </template>

      </el-table-column>
      <el-table-column v-slot="scope">
        <el-button
          v-if="config.hasEdit"
          type="primary"
          size="small"
          @click="editFormRef.showEditDialog(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-if="config.hasDelete"
          type="danger"
          size="small"
          @click="handleDeleteItem(scope.row.id)"
        >
          删除
        </el-button>
      </el-table-column>
    </el-table>
    <edit-form ref="editFormRef" :items="items" />
  </div>
</template>

<script setup>
import {inject, reactive, ref} from 'vue';
import EditForm from './EditForm';

const props= defineProps({
  items: Array,
})
const config = reactive({
  enable: false,
  hasEdit: true,
  hasDelete: true,
})

const repository = inject('repository');
const list = repository.list
const editFormRef = ref();

const handleStatusChange = (index, row) => {
  repository.updateItem(row);
};

const handleDeleteItem = (id) => {
  repository.deleteItem(id).then(() => {
    repository.refreshList();
  });
};

defineExpose({
  config
})


</script>

<style scoped>

</style>
