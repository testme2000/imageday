import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vue from "vue"
import app from "./src/App.vue"
import axios from 'axios'
import { exportAllDeclaration } from '@babel/types';
import GLOBAL from './src/mixins/Global.vue'

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
        let objType = Object.prototype.toString.call(app.created);
        expect(objType).toContain('Function');
        // component method initilizeImageDay is invoked within created hook
        objType = Object.prototype.toString.call(app.methods.initilizeImageDay);
        expect(objType).toContain('Function');
    })
    test('Default data is initialize', () => {
        // Component has data function
        let objType = Object.prototype.toString.call(app.data);
        expect(objType).toContain('Function');
        // Invoke data function and verify the value
        let objValue = app.data();
        expect(objValue.resultStatus).toBeFalsy();
        expect(objValue.imageInformation.title).toBe('');
        expect(objValue.imageInformation.copyright).toBe('');
        expect(objValue.imageInformation.detailExplanation).toBe('');
        expect(objValue.imageInformation.date).toBe('');
        expect(objValue.imageInformation.urlinfo).toBe('');
        // Mount app and verify data
        let appInstance = new Vue(app).$mount();
        let todayDate = new Date();
        expect(appInstance.currentDate.getFullYear()).toEqual(todayDate.getFullYear());
        expect(appInstance.currentDate.getMonth() + 1).toEqual(todayDate.getMonth() + 1);
        expect(appInstance.currentDate.getDate()).toEqual(todayDate.getDate());
    })
    test('Lifecycle create hook verification', () => {
        const initilizeImageDay = jest.fn();
        const wrapper = shallowMount(app, {
            methods : {
                initilizeImageDay
            }
        });
        expect(initilizeImageDay).toHaveBeenCalled();
        expect(initilizeImageDay).toHaveBeenCalledTimes(1);
    })
    test('App emitted event verification', () => {
        // Mount the app
        const wrapper = mount(app);
        // Emitt the event
        let todayDate = new Date();
        const imgInfo = {
            title : 'Testing NASA Image',
            copyright : 'sample copyright',
            detailExplanation : 'This is just testing',
            date : todayDate,
            urlinfo : 'sample url'
        }
        wrapper.vm.$emit('imagefetched', imgInfo);
        expect(wrapper.emitted().imagefetched[0][0].title).toBe('Testing NASA Image');
        expect(wrapper.emitted().imagefetched[0][0].copyright).toBe('sample copyright');
        expect(wrapper.emitted().imagefetched[0][0].detailExplanation).toBe('This is just testing');
        expect(wrapper.emitted().imagefetched[0][0].urlinfo).toBe('sample url');
        expect(wrapper.emitted().imagefetched[0][0].date.getFullYear()).toEqual(todayDate.getFullYear());
        expect(wrapper.emitted().imagefetched[0][0].date.getMonth() + 1).toBe(todayDate.getMonth() + 1);
        expect(wrapper.emitted().imagefetched[0][0].date.getDate()).toBe(todayDate.getDate());
    })
});