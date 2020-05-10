import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '5px',

    },
    input: {
        marginRight: '1rem',
    }
}

function ToDoItem(props) {

    const {removeTodo} = useContext(Context)      // Как значение будет использоваться useContext в которое передается контекст
                                        // из значения value заданного в Context.Provider

    let classes = [];

    if (props.todo.completed) {
        classes.push('done')
    }

    return <li style={styles.li}>
        <span className={classes.join(' ')}>
            <input type='checkbox'
                   checked={props.todo.completed}
                   style={styles.input}
                   onChange={() => props.onChange(props.todo.id)}/>
            <strong>{props.idx + 1}</strong>
            &nbsp;
            {props.todo.title}
        </span>

        <button className='rm' onClick={() => removeTodo(props.todo.id)}>&times;</button>
    </li>
}

ToDoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default ToDoItem;