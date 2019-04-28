import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vue from "vue"
import FetchImage from './src/components/FetchImage.vue'
import axios from 'axios'
import { exportAllDeclaration } from '@babel/types';
import GLOBAL from './src/mixins/Global.vue'

describe("ImageDay Basic Layout Test", () => {
    ////////////////////////////////////////////////////////////////////
    // Prepare inital setup
    // 1. Mount the app
    let imgWrapper = mount(FetchImage)
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    // Basic App Property Checking
    test("Image Layout Verification", () => {
        // 1. Validate instance
        expect(imgWrapper.isVueInstance()).toBeTruthy();
        // 2. Layout - Div
        expect(imgWrapper.html().includes("div")).toBe(true);
        expect(imgWrapper.find("div").isVisible()).toBe(true);
        let tagarray = imgWrapper.findAll("div");
        expect(tagarray.length).toBe(1);
        // 3. Layout - h1
        expect(imgWrapper.html().includes("h1")).toBe(true);
        expect(imgWrapper.find("h1").isVisible()).toBe(true);
        tagarray = imgWrapper.findAll("h1");
        expect(tagarray.length).toBe(1);
        // 4. Text content
        expect(imgWrapper.find('h1').text()).toBe("Fetching is in progress for today.....");
    });
    describe('Global Mixins Test', () => {
        test("Global Mixins Validation",  () => {
            ////////////////////////////////////////////////////////////////////
            // Prepare inital setup
            // 1. Mount the app
            const imgwrapper = mount(FetchImage, {
                mixins: [GLOBAL]
            });
            // 2. Global Mixins has proper value
            expect(imgwrapper.vm.NASA_WEBURL).toEqual('https://api.nasa.gov/planetary/apod?api_key=');
            expect(imgwrapper.vm.NASA_APIKEY).toEqual('vME6LAMD7IhEiy7rDmjfIaG6MhiKbu1MNIqxtqd1');
        });
    });
});

describe('FetchImage Component initialzation Test', () => {
    ////////////////////////////////////////////////////////////////////
    // Prepare inital setup
    // 1. Mount the app
    test('Created hook to be function', () => {
        // Created hook is function that is added in app
        let objType = Object.prototype.toString.call(FetchImage.created);
        expect(objType).toContain('Function');
        // component method initilizeImageDay is invoked within created hook
        objType = Object.prototype.toString.call(FetchImage.mounted);
        expect(objType).toContain('Function');
        // component method initilizeImageDay is invoked within created hook
        objType = Object.prototype.toString.call(FetchImage.methods.preparedFetch);
        expect(objType).toContain('Function');
    })
    test('Default data is initialize', () => {
        // Component has data function
        let objType = Object.prototype.toString.call(FetchImage.data);
        expect(objType).toContain('Function');
        // Invoke data function and verify the value
        let objValue = FetchImage.data();
        expect(objValue.resultArrived).toBeFalsy();
        expect(objValue.Status).toEqual("Fetching is in progress for today.....");
        expect(objValue.imageInformation.title).toBe('');
        expect(objValue.imageInformation.copyright).toBe('');
        expect(objValue.imageInformation.detailExplanation).toBe('');
        expect(objValue.imageInformation.date).toBe('');
        expect(objValue.imageInformation.urlinfo).toBe('');
        // Mount app and verify data
        let imgInstance = new Vue(FetchImage).$mount();
        expect(imgInstance.imageurl).toBe(imgInstance.NASA_WEBURL + imgInstance.NASA_APIKEY);
    })
    test('Lifecycle create hook verification', () => {
        const initilizeImageDay = jest.fn();
        const wrapper = shallowMount(app, {
            methods : {
                initilizeImageDay
            }
        });
        expect(initilizeImageDay).toHaveBeenCalled();
    })
    /*
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
    })*/
});