import React, { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Space, Input, Button } from "antd"
import { gteCodeApi } from "@/request/api"
import initBg from "./init"
import styles from "./login.module.scss"
import "./login.less"

export default () => {
  // 路由跳转方式
  const navigateTo = useNavigate()
  // 地址栏参数
  const [ routeParams ] = useSearchParams()
  const [ size ] = useState(15)
  const [ userName, setUserName ] = useState("")
  const [ code, setCode ] = useState("")
  const [ codeUrl, setCodeUrl ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ canLogin, setCanLogin ] = useState(false)
  // 组件加载完成
  useEffect(() => {
    // localStorage.clear()
    // 初始化背景
    initBg()
    // 获取验证码
    // getCode()
    window.onresize = () => {
      setTimeout(() => {
        initBg()
      }, 300)
    }
  }, [])
  // 监听账号密码是否有值
  // useEffect(() => {
  //   setCanLogin(userName !== "" && password !== "" && code !== "")
  // }, [ userName, password, code ])
  const getCode = () => {
    // 请求验证码
    // gteCodeApi().then((res) => {
    //   console.log(res)
    // })
  }
  // 登录
  const doLoginFn = () => {
    // if (canLogin) {
    //   setLoading(true)
    //   setTimeout(() => {
    //     setLoading(false)
    //     localStorage.setItem("token", "this is token")
    //     toMainPage()
    //   }, 2000)
      toMainPage()
    // }
  }
  // 登录成功之后跳转
  const toMainPage = () => {
    navigateTo(routeParams.get("redirect") || "/", { replace: true })
  }
  // 回车事件
  const onKeyDown = (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      doLoginFn()
    }
  }
  const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }
  const changeUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const changeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }
  return (
    <div className={ styles.loginWrap } onKeyDown={ onKeyDown }>
      <canvas id="canvas" className={ styles.bg }></canvas>
      <div className={ styles.formWrap + " login-box" }>
        <Space direction="vertical" size={ size } style={ { display: "flex" } }>
          <div className={ styles.title }>
            <h1>通用后台系统</h1>
            <p>Strive Everyday</p>
          </div>
          <Input value={ userName } placeholder="用户名" allowClear onChange={ changeUserName } />
          <Input.Password value={ password } placeholder="密码" allowClear onChange={ changeUserPassword } />
          <div className="captcha-box">
            <Input value={ code } placeholder="验证码" maxLength={ 6 } allowClear onChange={ changeCode } />
            <div className="captcha-image">
              <img src={ codeUrl } alt="" onClick={ getCode } />
            </div>
          </div>
          <Button type="primary" loading={ loading } block onClick={ doLoginFn }>登录</Button>
        </Space>
      </div>
    </div>
  )
}
