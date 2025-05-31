import React from 'react';
import "./style.css";

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  return lists ? JSON.parse(lists) : [];
};

const generateTerminalNoise = () => {
  const commands = [
    'ls -la', 'cd /usr/local/bin', 'ping google.com', 'top', 'cat config.yaml',
    'nano todo.txt', 'sudo reboot', 'npm install', 'git status', 'rm -rf /tmp/*',
    'echo "Hello, world!"', 'curl http://localhost:3000', 'chmod +x script.sh',
    'htop', 'ps aux', 'grep "error" logs.txt', 'docker ps', 'df -h',
    'whoami', 'mkdir new_folder', 'rmdir old_folder', 'touch notes.txt',
    'scp file.txt user@host:/home/user', 'kill -9 1234', 'clear', 'history',
    'alias ll="ls -la"', 'service nginx restart', 'yarn dev', 'npx create-react-app myApp'
  ];

  const lines = Array.from({ length: 300 }, (_, i) => {
    const cmd = commands[Math.floor(Math.random() * commands.length)];
    return <div key={i}>~ user@todo:~$ {cmd}</div>;
  });

  return lines;
};

const Todo = () => {
  const [inputdata, setInputData] = React.useState("");
  const [items, setItems] = React.useState(getLocalData());
  const [isEditItem, setIsEditItem] = React.useState("");
  const [toggleButton, setToggleButton] = React.useState(false);

  const addItem = () => {
    if (!inputdata) {
      alert("Please fill the item name");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );
      setInputData("");
      setIsEditItem("");
      setToggleButton(false);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, newInputData]);
      setInputData("");
    }
  };

  const editItem = (id) => {
    const item_todo_edited = items.find((curElem) => curElem.id === id);
    setInputData(item_todo_edited.name);
    setIsEditItem(id);
    setToggleButton(true);
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((curElem) => curElem.id !== id);
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  React.useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  const terminalNoise = generateTerminalNoise();

  return (
    <>
      <div className="terminal-noise">
        {terminalNoise}
      </div>

      <div className="main_div">
        <div className="child_div">
          <h1 className="terminal-title">~ Todo Terminal ~</h1>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add an Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            <button onClick={addItem} className="terminal-btn">
              {toggleButton ? "Edit" : "Add"}
            </button>
          </div>

          <div className="showItems">
            {items.map((curElem) => (
              <div className="eachItem" key={curElem.id}>
                <span className="item-text"> {curElem.name}</span>
                <div className="todo-btn">
                  <button onClick={() => editItem(curElem.id)}>Edit</button>
                  <button onClick={() => deleteItem(curElem.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>

          <div className="showItems">
            <button className="terminal-btn danger" onClick={removeAll}>
              [CLEAR LIST]
            </button>
          </div>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer">Built by Kanishk Jain</div>
      </div>
    </>
  );
};

export default Todo;
