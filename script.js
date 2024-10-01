const API_KEY = "$2a$10$Rc9zVq.18U/l6zYP.ucXnOEY1nxq7z3M07sd7WPea2bKoW2l561Tq";
const ROOT_URL = "https://api.jsonbin.io/v3/b";

class NoteHandler {
    constructor(id) {
        this.id = id;
    }
    async post(data) {
        try {
            let response = await fetch(ROOT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": API_KEY,
                    "X-Bin-Private": false,
                },
                body: data,
            });
            let result = await response.json();
            console.log(result);

            return result["metadata"]["id"];
        } catch (err) {
            throw new console.error(err);
        }
    }

    async get(binID) {
        try {
            let response = await fetch(ROOT_URL + "/" + binID+"/latest", {
                method: "GET",
                headers: {
                    "X-Master-Key": API_KEY,
                },
            });

            let result = await response.json();
            console.log(result);
            return result;
        } catch (err) {
            throw new console.error(err);
        }
    }
}

const params = new URLSearchParams(window.location.search);
const shareID = params.get("share");
console.log(shareID);
if (shareID !== null) {
    const receive = new NoteHandler("anything for now");
    
    receive.get(shareID)
        .then(result => {
            const note = document.querySelector(".note");
            const name = document.querySelector(".sender-name");

            name.innerHTML = result["record"]["sender"];
            note.value = result["record"]["note"];
        });
}

async function share() {
    // const ID = generateID();
    const send = new NoteHandler("anything for now");
    const data = createData();

    const ID = await send.post(data);
    const param = new URLSearchParams();

    param.append("share", ID);
    console.log(window.location.href + "?" + param.toString());
}
function createData() {
    const note = document.querySelector(".note").value;
    const name = document.querySelector(".sender-name").innerHTML;
    
    const data = {
        "sender": name,
        "note": note,
    };
    
    return JSON.stringify(data);
}
// function generateID() {
//     const d = new Date();
//     let time = d.getTime();
//     let id = String(Math.floor(Math.random() * 1000000)) + String(time);

//     return id;
// }
// async function postNote() {
//     try {
//         let response = await fetch(ROOT_URL, {
//             method: "POST",
            
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-Master-Key": API_KEY
//             },
//             body: {
//                 "name": "anythin" 
//             },
//         });
//     } catch (err) {
//         throw new console.error(err);
//     }
// }
