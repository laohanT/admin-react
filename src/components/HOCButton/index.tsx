// withDoubleClick.tsx (HOC增强功能)
import React from 'react';
/*
    <P extends Object>
    用来定义WrappedComponent组件的参数类型
*/
const withDoubleClick = <P extends Object>(WrappedComponent: React.ComponentType<P>) => {
    return (props: P) => {
        const onClick = () => {
            const { onClick } = props as any
            console.log('保存了日志', props);
            if (onClick) {
                // 原来的逻辑
                onClick()
            }
        }
        return <WrappedComponent {...props} onClick={onClick} />
    }
}


export default withDoubleClick;
