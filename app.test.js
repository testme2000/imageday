import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vue from "vue"
import app from "./src/App.vue"
import axios from 'axios'
import { exportAllDeclaration } from '@babel/types';
import GLOBAL from './src/mixins/Global.vue'


//jest.mock('axios', () => ({
//    get: jest.fn()
//}));

describe("ImageDay Basic Layout Test", () => {
    ////////////////////////////////////////////////////////////////////
    // Prepare inital setup
    // 1. Mount the app
    let appWrapper = mount(app)
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    // Basic App Property Checking
    test("App Property Verification", () => {
        // 1. Validate instance
        expect(appWrapper.isVueInstance()).toBeTruthy();
        // 2. Div Tag - Visiblity, count, attribute
        expect(appWrapper.html().includes("div")).toBe(true);
        expect(appWrapper.attributes().id).toBe("app");
        expect(appWrapper.find("div").isVisible()).toBe(true);
        let divarray = appWrapper.findAll("div");
        expect(divarray.length).toBe(4);
        // 6. Table, Row and column Tag - Visiblity, count, attribute
        expect(appWrapper.html().includes("table")).toBe(true);
        expect(appWrapper.findAll('table').length).toEqual(1);
        expect(appWrapper.find("table").isVisible()).toBe(false);
        expect(appWrapper.findAll('tr').length).toEqual(3);        
        expect(appWrapper.find("tr").isVisible()).toBe(false);
        expect(appWrapper.findAll('td').length).toEqual(6);        
        expect(appWrapper.find("td").isVisible()).toBe(false);
        let allTD = appWrapper.findAll("td");
        let textArray = [   "Title","","Information","","Copyright",""];
        for(let count = 0;count < allTD.length;count++) {
            expect(allTD.at(count).text()).toBe(textArray[count]);
        }
        // Image
        expect(appWrapper.html().includes("img")).toBe(true);
        expect(appWrapper.findAll('img').length).toEqual(1);
        expect(appWrapper.find("img").isVisible()).toBe(false);
        // Head H1,H2
        expect(appWrapper.html().includes("h1")).toBe(true);
        expect(appWrapper.find("h1").isVisible()).toBe(true);
        expect(appWrapper.html().includes("h2")).toBe(true);
        expect(appWrapper.find("h2").isVisible()).toBe(true);
        expect(appWrapper.find('h1').text()).toBe("Welcome to Image Day");
        expect(appWrapper.find('h2').text()).toBe("Image of today");
    });
});


describe('Global Mixins Test', () => {
    test("Global Mixins Validation",  () => {
        ////////////////////////////////////////////////////////////////////
        // Prepare inital setup
        // 1. Mount the app
        const appwrapper = mount(app, {
            mixins: [GLOBAL]
        });
        // 2. Global Mixins has proper value
        expect(appwrapper.vm.NASA_WEBURL).toEqual('https://api.nasa.gov/planetary/apod?api_key=');
        expect(appwrapper.vm.NASA_APIKEY).toEqual('vME6LAMD7IhEiy7rDmjfIaG6MhiKbu1MNIqxtqd1');
    });
});


describe('App Component initialzation Test', () => {
    ////////////////////////////////////////////////////////////////////
    // Prepare inital setup
    // 1. Mount the app
    test('Created hook to be function', () => {
        // Created hook is function that is added in app
        var objType = app.created.toString();
        expect(objType).toContain('function');
        // component method initilizeImageDay is invoked within created hook
        expect(objType).toContain('initilizeImageDay');
    })
    test('Default data is initialize', () => {
        
    })
});