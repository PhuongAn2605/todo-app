import React from "react";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import './TodoItem.scss';

class TodoItem extends React.Component{
    render(){
        const { item, toggleCompleted } = this.props;
        // console.log(item)

        return(
            <div className="todo-item">
                {item.isCompleted ? <CheckCircleOutlineOutlinedIcon onClick={toggleCompleted} /> : <CircleOutlinedIcon onClick={toggleCompleted} />}
                <p className={item.isCompleted ? "todo-item__title--completed" : "todo-item__title--uncompleted"}>{item.title}</p>
            </div>
        )
    }
};

export default TodoItem;