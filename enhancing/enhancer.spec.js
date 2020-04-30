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
            expect(item.durability).toBe(40);
            enhancer.repair(item);
            expect(item.durability).toBe(100);
        });
    })
    describe('Enhancment succeed functionality', () => {
        it('should increase enhancment', () => {
            expect(item.enhancment).toBe(0);
            enhancer.succeed(item);
            expect(item.enhancment).toBe(1);
        });
    
        it('should not change durability', () => {
            let durability = item.durability;
            enhancer.succeed(item);
            expect(item.durability).toBe(durability);
        });
    
        it('should not increase past 20 enhancment', () =>{
            item.enhancment = 20;
            expect(item.enhancment).toBe(20);
            enhancer.succeed(item);
            expect(item.enhancment).toBe(20);
        })
    });

    describe('Enhanment fail functionality', () => {
        it('should decrease durability by 5 if the items enhancment is less then 15 ', () => {
            let prevDurability = item.durability;
            for(i=0; i > 15; i++){
                item.enhancment = i;
                enhancer.fail(item);
                expect(item.durability).toBe(prevDurability - 5);
            }
        });

        it('should decrease the durability by 10 if enhancment is 15 or more', () => {
            let prevDurability = item.durability;
            for(i=15; i >= 20; i++){
                item.enhancment = i
                enhancer.fail(item);
                expect(item.durability).toBe(prevDurability - 10);
            }
        });

        it('should decrease the durability by 10 and also the enhancment level by 1 if the item level is greater than 16', () => {
            let prevDurability = item.durability;
            for(i=17; i >= 20; i++){
                item.enhancment = i;
            
                enhancer.fail(item);
                expect(item.durability).toBe(prevDurability - 10);
                expect(item.enhancment).toBe(i - 1);
            } 
        });
    });

    describe('Name Functionality', () =>{
        it('should not return a name if enhancment level is 0', () => {
            item.enhancment = 0;
            let prevName = item.name
            enhancer.get(item)
            expect(item.name).toBe(prevName);
        });

        it('should Add the prefix if the enhancment level is greater then 0', () => {
            let prevName = item.name;
            for(i=1; i >= 20; i++){
                item.enhancment = i;
                enhancer.get(item);
                expect(item.name).toBe(`[+${item.enhancment}] ${prevName}`)
            }
        });
    })

    
})