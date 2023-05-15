import { useEffect, useState } from 'react'

export default () => {

  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  // useEffect(() => {
  //   setInterval(() => {
  //     // 问题：点击按钮3次，这里的 value 打印出是 ？
  //     console.log('value-1:   ', value);
  //   }, 1000)
  // }, [])


  useEffect(() => {
    let timer = setInterval(() => {
      // 问题：点击按钮3次，这里的 value 打印出是 ？
      console.log('value-2:   ', value2);
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [value2])


  return (
    <div>
      <h2>demo-1  useEffect 闭包陷阱</h2>
      <hr />
      <h2>{value}</h2>
      <button onClick={() => setValue(value + 1)}>click</button>
      <br />
      <br />
      <h2>{value2}</h2>
      <button onClick={() => setValue2(value2+1)}>click</button>
    </div>
  )
}
