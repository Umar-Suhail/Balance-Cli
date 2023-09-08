import { File } from "../modules/file";
import {describe, expect, test} from '@jest/globals';

describe('File Module',()=>{
    it('Reads File',()=>{
        
        const file = File.read('./input.txt')
        expect(file).toBeTruthy()
        const file2 = File.read('./sample2.txt')
        expect(file2).toBe(false)
    })
    it('Parses File',()=>{
        const file = File.read('./input.txt')
        const commands = File.parse(file)
        expect(commands).toBeDefined()  
        expect(commands).toBeTruthy()   
    })
})