/**
 * Принимает в себя два аргумента, один из них принимает объект, второй строку с названием
 * дескриптора. Должно вернуть массив строк, которыми являются ключи объекта соответствующие
 * дескриптору. То есть если у нас есть два свойства у которых writable true(если мы передали арг
 * writable) то возвращает массив со строками-названиями этих свойств. Смотрите пример в check.js
 * @param {Object} object
 * @param {'writable' | 'enumerable' | 'configurable'} descriptor
 *
 * @returns string[]
 */
export const getKeysByDescriptor = (object, descriptor) => {
    const arr = [];
    const newObj = Object.getOwnPropertyDescriptors(object);
    for (let key in newObj) {
        if (newObj[key][descriptor] === true) {
            arr.push(key);
        }
    }
    return arr;
};

/**
 * Должен вернуть true если объект был заморожен каким-либо методом заморозки freeze, seal, preventExtensions иначе false
 * @param {Object} object
 * @returns {boolean}
 */
export const isObjectAnyFrozen = (object) => {
  if (Object.isExtensible(object) === false) {
        return true
    } else {
        return false
    }
};

/**
 * Принимает объект и строку. Мы должны вернуть НОВЫЙ объект(копию оригинального), в котором
 * название свойства (мы передали вторым аргументом), будет поставлено во writable false(только
 * нельзя перезаписывать, все остальное можно). Если свойство было в объекте, то мы ставим его значение
 * если не было ставим в значение null
 * @param {Object} object
 * @param {string} propertyName
 *
 * @returns {Object}
 */
export const assignLockedValues = (object, propertyName) => {
  let obj = Object.assign({}, object);
    if(obj.hasOwnProperty(propertyName)){
        Object.defineProperty(obj, propertyName, {
             writable: false
        });   
    }
    else {
        Object.defineProperty(obj, propertyName, {
            value: null,
            writable: false,
            enumerable: true,
            configurable: true
        });
    }
    return obj;
};

/**
 * Принимает объект и возвращает его копию, только абсолютно замороженную
 * Нельзя удалять свойства, добавлять и редактировать
 * @param {Object} object
 * @returns {Object}
 */
export const freezeAllInObject = (object) => {
  return Object.freeze(Object.assign({}, object));
};
