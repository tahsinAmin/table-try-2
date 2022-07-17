import {
    chakra,
    Box, Button,
    HStack,
    Input,
    Text, Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
    const [columns, setColumns] = useState(0);
    const [rows, setRows] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [areInputsOpen, setAreInputsOpen] = useState(false)
    const [arr, setArr] = useState([])

    const [isTableOpen, setIsTableOpen] = useState(false)

    const handleSubmit = () => {
        let myArray = []
        for (let i = 0; i < columns; i++) {
            myArray.push({ id: i, name: '', type: '' })
        }
        setArr(myArray)
        setAreInputsOpen(true)
    }

    const handleSubmit2 = (e) => {
        e.preventDefault()
        console.log(arr)
        setIsTableOpen(true)
    }

    const updateFieldChanged = index => e => {
        let oldArray = JSON.parse(JSON.stringify(arr))
        let newBikeArray = [...oldArray];// copying the old data array
        newBikeArray[index][e.target.name] = e.target.value;// replace e.target.value with whatever you want to change it to
        setArr(newBikeArray)
    }


    useEffect(() => { }, [columns])

    return (
        <Box>
            <chakra.form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>
                <Input type={'number'} placeholder={'columns'} value={columns} onChange={(e) => setColumns(e.target.value)} />
                <Button type={'submit'}> Submits</Button>
            </chakra.form>


            {areInputsOpen &&
                (
                    <chakra.form onSubmit={handleSubmit2}>
                        {arr.map((m, index) => (
                            <HStack key={m?.id} mt={5} boxShadow={'2xl'} p={5}>
                                <Input placeholder={'Name'} name={'name'} value={m.name} onChange={updateFieldChanged(index)} />
                                <Select placeholder='Column Type' name={'type'} value={m.type} onChange={updateFieldChanged(index)}>
                                    <option value='string'>String</option>
                                    <option value='boolean'>Boolean</option>
                                </Select>
                            </HStack>
                        ))}
                        <Button type="submit">Go</Button>
                    </chakra.form>
                )
            }
            {isTableOpen && (
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                {arr.map((m, index) => (<Th key={index}>{m.name}</Th>))}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {rows.map((r, ind) => (
                                <Tr key={ind}>
                                    {arr.map((m, index) => (<Td key={index}>{`column ` + index}</Td>))}
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    )
}