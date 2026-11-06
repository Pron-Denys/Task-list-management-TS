import * as readline from "readline"

const input = readline.createInterface({
    "input": process.stdin,
    "output":process.stdout
});

async function readLine(question: string): Promise<string> {
    return new Promise<string>((resolve) => {
        input.question(question, (answer: string) =>
        resolve(answer));
    });
}

let counterTasks: number = 0;
let tasks: Array<{id: number, title: string, description: string, completed: boolean}> = [];

function addTask(title: string, description: string): void {
    tasks[counterTasks++] = {
    id: counterTasks,
    title: title,
    description: description,
    completed: false
    };
}

function removeTask(id: number): void {
    tasks = tasks.filter((task) => task.id != id);
}

function markTaskAsCompleted(id: number): void {
    const task = tasks.find((task) => task.id == id);
    if (typeof task != "undefined") task!.completed = true;
}

function listTasks(): void {
    console.clear();
    console.log("\n\n\t- - - - - - -   Список завдань  - - - - - - - - -");
    for (const index in tasks) {
        console.log(`\n\t№${tasks[index].id} | Тема: ${tasks[index].title} | Статус: ${(tasks[index].completed) ? "Виконано" : "Не виконано"}
            Завдання:\n\t${tasks[index].description}`);
        console.log("\t- - - - - - - - - - - - - - - - - - - - - - - - -");
    }
}

function listCompletedTasks(): void {
    console.clear();
    console.log("\n\n\t- - - - - Список виконаних завдань  - - - - - -");
    for (const index in tasks) {
        if (!tasks[index].completed) continue;
        console.log(`\n\t№${tasks[index].id} | Тема: ${tasks[index].title} | Статус: ${(tasks[index].completed) ? "Виконано" : "Не виконано"}
            Завдання:\n\t${tasks[index].description}`);
        console.log("\t- - - - - - - - - - - - - - - - - - - - - - - -");
    }
}

function listPendingTasks(): void {
    console.clear();
    console.log("\n\n\t- - - - - Список не виконаних завдань  - - - - -");
    for (const index in tasks) {
        if (tasks[index].completed) continue;
        console.log(`\n\t№${tasks[index].id} | Тема: ${tasks[index].title} | Статус: ${(tasks[index].completed) ? "Виконано" : "Не виконано"}
            Завдання:\n\t${tasks[index].description}`);
        console.log("\t- - - - - - - - - - - - - - - - - - - - - - - -");
    }
}

const main = async () => {
    let flag: boolean = true;
    while(flag) {
        console.log("\n\t- - - - - Управління списком завдань  - - - - - -");
        console.log("1 - Показати всі завдання  | 2 - Додати завдання | 3 - Видалити завдання");
        console.log("4 - Показати не виконанні завдання");
        console.log("5 - Показати виконанні завдання");
        console.log("6 - Відмітити завдання як виконане");
        console.log("7 - Завершити роботу");
        let choice = await readLine("Оберіть: ");
        console.clear();
        switch(parseInt(choice)) {
            case 1:
                listTasks();
                break;
            case 2:
                const title = await readLine("Введіть тему завдання: ");
                const description = await readLine("Введіть опис завдання: ");
                addTask(title, description);
                listTasks();
                break;
            case 3:
                const id = await readLine("Введіть номер завдання: ");
                removeTask(parseInt(id));
                listTasks();
                break;
            case 4:
                listPendingTasks();
                break;
            case 5:
                listCompletedTasks();
                break;
            case 6:
                const idRemove = await readLine("Введіть номер завдання: ");
                markTaskAsCompleted(parseInt(idRemove));
                break;
            default:
                console.clear();
                console.log("Ви завершили роботу!");
                flag = false;
        }
    }
}

main();

