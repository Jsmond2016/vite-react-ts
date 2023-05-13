import { useSelector, useDispatch } from "react-redux"
import numStore from "@/store/num"

export default () => {
  // 获取 store 数据方式
  const { num } = useSelector((state: RootStateType) => state.num)
  const { role } = useSelector((state: RootStateType) => state.user)
  // 触发 store 中的事件方法
  const dispatch = useDispatch()
  const changeNum = () => {
    // 同步写法
    // dispatch({ type: "add" })
    // 异步写法：redux-thunk
    // dispatch((commit: Function) => {
    //   setTimeout(() => {
    //     commit({ type: "add" })
    //   }, 1000)
    // })
    // 等同于
    dispatch(numStore.asyncActions.newAdd)
  }
  const changeRole = () => {
    dispatch({ type: "setRole", value: [ 1, 2, 3 ] })
  }
  return (
    <div>
      <div onClick={ changeNum }>{ num }</div>
      <button onClick={ changeNum }>改变数字</button>
      <p>{ role }</p>
      <button onClick={ changeRole }>改变Role</button>
    </div>
  )
}
