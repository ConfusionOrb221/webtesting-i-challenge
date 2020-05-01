const enhancer = require('./enhancer.js');
// test away!

describe('Testing Enhancer functions', () =>{
    let item = {
    }
    item.durability = 40;
    item.enhancment = 0;
    item.name = 'Iron Sword'

    describe('Durability functionality', () =>{
        it('should return an item with full durability', () => {
            let obj = enhancer.repair(item);
            expect(obj.durability).toBe(100);
            expect(item).not.toBe(obj);
        });
    })
    
    describe('Enhancment succeed functionality', () => {
        it('should increase enhancment', () => {
            let obj = enhancer.succeed(item);
            expect(obj.enhancment).toBe(1);
            expect(item).not.toBe(obj);
        });
    
        it('should not change durability', () => {
            let durability = item.durability;
            let obj = enhancer.succeed(item);
            expect(obj.durability).toBe(durability);
            expect(item).not.toBe(obj);
        });
    
        it('should not increase past 20 enhancment', () =>{
            item.enhancment = 20;
            let obj = enhancer.succeed(item);
            expect(obj.enhancment).toBe(20);
            expect(item).not.toBe(obj);
        })
    });

    describe('Enhanment fail functionality', () => {
        it('should decrease durability by 5 if the items enhancment is less then 15 ', () => {
            for(i=0; i < 15; i++){
                item.enhancment = i;
                let obj = enhancer.fail(item);
                expect(obj.durability).toBe(item.durability - 5);
                expect(item).not.toBe(obj);
            }
        });

        it('should decrease the durability by 10 if enhancment is 15 or more', () => {
            for(i=15; i <= 20; i++){
                item.enhancment = i
                let obj = enhancer.fail(item);
                expect(obj.durability).toBe(item.durability - 10);
                expect(item).not.toBe(obj);
            }
        });

        it('should decrease the durability by 10 and also the enhancment level by 1 if the item level is greater than 16', () => {
            let prevDurability = item.durability;
            for(i=17; i <= 20; i++){
                item.enhancment = i;
            
                let obj = enhancer.fail(item);
                expect(obj.durability).toBe(prevDurability - 10);
                expect(obj.enhancment).toBe(i - 1);
                expect(item).not.toBe(obj);
            } 
        });

        it('durability does not go below 0', () =>{
            item.durability = 1;

            let obj = enhancer.fail(item);
            expect(obj.durability).toBe(0);
            expect(item).not.toBe(obj);
        })
    });

    describe('Name Functionality', () =>{
        it('should not return a name if enhancment level is 0', () => {
            item.enhancment = 0;
            let prevName = item.name
            let obj = enhancer.get(item)
            expect(obj.name).toBe(prevName);
            expect(item).not.toBe(obj);
        });

        it('should Add the prefix if the enhancment level is greater then 0', () => {
            let prevName = item.name;
            for(i=1; i <= 20; i++){
                item.enhancment = i;
                let obj = enhancer.get(item);
                expect(obj.name).toBe(`[+${item.enhancment}] ${prevName}`)
                expect(item).not.toBe(obj);
            }
        });
    })

    
})