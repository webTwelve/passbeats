<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    size="default"
  >
    <el-form-item prop="user_name" label-width="auto">
      <el-input v-model="ruleForm.user_name" placeholder="账号">
        <template #suffix>
          <i-ep-user class="v-icon" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="pass_word" label-width="auto">
      <el-input v-model="ruleForm.pass_word" type="password" placeholder="密码">
        <template #suffix>
          <i-ep-lock class="v-icon" />
        </template>
      </el-input>
    </el-form-item>
    <div class="tools">
      <el-checkbox v-model="checked" label="自动登录" size="large" />
      <a style="color: #6892fe">忘记密码?</a>
    </div>
    <el-button
      style="width: 100%"
      type="primary"
      @click="submitForm(ruleFormRef)"
      >立即登录</el-button
    >
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { Login } from '@/api/login'
import Cookies from 'js-cookie'

const router = useRouter()
interface RuleForm {
  user_name: string
  pass_word: string
}
const checked = ref(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  user_name: '',
  pass_word: ''
})

const rules = reactive<FormRules<RuleForm>>({
  user_name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 11, message: '账号长度为3-11位', trigger: 'blur' }
  ],
  pass_word: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change'
    }
  ]
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      Login(ruleForm).then((res) => {
        console.log(res, '===')
        if (res.code === 200) {
          Cookies.set('token', res.data.token)
          router.push('/main')
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="less" scoped>
.tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    cursor: pointer;
    margin-top: 2px;
  }
}
</style>
