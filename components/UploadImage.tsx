const [attachment, setAttachment] = useState('')
const [filename, setFilename] = useState('')
const [filetype, setFiletype] = useState('')


async function handleOnSubmit(e: { preventDefault: () => void }) {

    e.preventDefault();
        const formData = {
            attachment,
            filename,
            filetype
        }

<label className="text-white text-base dark:text-white pt-4" htmlFor="attachment">Imagem do post</label>
<input id="attachment" name="attachment" className="w-full bg-white py-2 px-4 border border-secondary-200 rounded" type="file" onChange={(e) => {
    if(e.target!.files[0] === null) {
        setAttachment('')
        setFilename('')
        setFiletype('')
    }
    else {
        console.log(e.target!.files[0])
        const file = e.target!.files[0]
        const filename = file.name
        setFilename(filename)
        const filetype = file.type
        setFiletype(filetype)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            //console.log(e.target.result.toString().split(",").pop())
            setAttachment(e.target!.result.toString().split(",").pop())
        }
    }
}}/>