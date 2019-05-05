import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vue from "vue"
import FetchImage from './src/components/FetchImage.vue'
import axios from 'axios'
import { exportAllDeclaration } from '@babel/types';
import GLOBAL from './src/mixins/Global.vue'
import { JestEnvironment } from '@jest/environment';

jest.mock('axios', () => ({
    get: jest.fn()
}));

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
    test('Lifecycle  hook verification', () => {
        jest.useFakeTimers();

        let hookwrapper = mount(FetchImage);
        expect(hookwrapper.vm.imageurl.length).not.toBeNull();
        expect(hookwrapper.vm.imageurl).toBe('https://api.nasa.gov/planetary/apod?api_key=vME6LAMD7IhEiy7rDmjfIaG6MhiKbu1MNIqxtqd1');

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
    })

    describe('Image Fetching Verification', () => {
        beforeEach(() => {
            axios.get.mockClear();
           axios.get.mockReturnValue(Promise.resolve({}));
        });
        it('Valid Value verfication',async () => {
            let todayDate = new Date();
            // Given
            const result = { 
                data :  {
                    title: "A Sample Image from Galaxy",
                    copyright: "Sample Copyright",
                    explanation: "Sample Image explanation detail",
                    date: todayDate,
                    url: "https://image.url.gov"
                }
            };
            axios.get.mockReturnValue(Promise.resolve(result));
            const fetchwrapper = mount(FetchImage);
            await fetchwrapper.vm.$nextTick();
            // Fetch the image 
            axios.get.mockReturnValue(Promise.resolve(result));
            fetchwrapper.vm.preparedFetch();
            await fetchwrapper.vm.$nextTick();
    

            // Validate the result
            expect(axios.get).toHaveBeenCalledWith('https://api.nasa.gov/planetary/apod?api_key=vME6LAMD7IhEiy7rDmjfIaG6MhiKbu1MNIqxtqd1');
            let objType = Object.prototype.toString.call(fetchwrapper.vm.imageInformation);
            expect(objType).toContain('Object');
            // Check the internal state
            expect(fetchwrapper.vm.imageInformation.title).toEqual("A Sample Image from Galaxy");
            expect(fetchwrapper.vm.imageInformation.copyright).toEqual("Sample Copyright");
            expect(fetchwrapper.vm.imageInformation.detailExplanation).toEqual("Sample Image explanation detail");
            expect(fetchwrapper.vm.imageInformation.urlinfo).toEqual("https://image.url.gov");
            expect(fetchwrapper.vm.imageInformation.date.getFullYear()).toEqual(todayDate.getFullYear());
            expect(fetchwrapper.vm.imageInformation.date.getMonth() + 1).toBe(todayDate.getMonth() + 1);
            expect(fetchwrapper.vm.imageInformation.date.getDate()).toBe(todayDate.getDate());
            expect(fetchwrapper.vm.resultArrived).toBeTruthy();
            expect(fetchwrapper.vm.errorMessage.length).toEqual(0);
        });
    });

    describe('Invalid response', () => {
        beforeEach(() => {
            axios.get.mockClear();
           axios.get.mockReturnValue(Promise.reject({}));
        });
        it('Valid Value verfication',async () => {
            let todayDate = new Date();
            // Given
            const result = { 
                errorMessage : "Information not found",
                resultArrived : true,
                fetchStatus : true
            };
            axios.get.mockReturnValue(Promise.reject(result));
            const fetchwrapper = mount(FetchImage);
            await fetchwrapper.vm.$nextTick();
            // Fetch the image 
            axios.get.mockReturnValue(Promise.resolve(result));
            fetchwrapper.vm.imageurl = "https:\\invalid.request.gov";
            fetchwrapper.vm.preparedFetch();
            await fetchwrapper.vm.$nextTick();
        });



    });
});