#include<bits/stdc++.h>
using namespace std;

class TextEditor{
    private:
        vector<string> storage;
        vector<vector<string>> undoStorage;
        vector<vector<string>> redoStorage;

        void addToUndoStorage(){
            undoStorage.push_back(storage);

            //ab agar 5 se jyada purani state save hai tho sabse purani wali remove karege
            if(undoStorage.size() > 6){
                undoStorage.erase(undoStorage.begin());
            }
        }
    
    public:

        //Inserting data at a given line/index
        void insertData(int lineNo, string str){
            if(lineNo < 0 or lineNo > storage.size()){
                cout << "Given line number is invalid, so Not able to insert data" << endl;
                return;
            }

            //Doing All by myself
            //Now firstly inserting data in the end then we will move the data to its spefified position
            //agar position last index hai tab bhi insert karne dege
            storage.push_back(str);

            //sahi jagha par lejaege
            for (int i = storage.size()-1; i > lineNo; i--){
                swap(storage[i], storage[i - 1]);
            }

            //Using inbuilt function
            // storage.insert(storage.begin() + lineNo - 1, str);


            //Storing the current array in undo storage for getting back the previous stage
            addToUndoStorage();
        }

        //append the data at the end
        void appendData(string str){
            storage.push_back(str);
            addToUndoStorage();
        }

        //delete data of a given index
        void deleteData(int lineNo){
            if(lineNo < 0 or lineNo > storage.size()){
                cout << "Given line number is invalid, so Not able to delete Data" << endl;
                return;
            }
            
            //Doing All by myself
            //swapping all the lines backward and then resizing the storage
            for (int i = lineNo; i < storage.size()-1; i++){
                swap(storage[i], storage[i + 1]);
            }
            storage.resize(storage.size() - 1);

            //using inbuilt library
            // storage.erase(storage.begin() + lineNo);

            addToUndoStorage();
        }

        //search the 
        int searchData(string query){
            for (int i = 0; i < storage.size(); i++){
                if(storage[i].find(query) != string::npos){
                    return i;
                }
            }

            cout << "The query is not present in the Storage." << endl;
        }

        //display complete file
        void displayData(){
            for(auto line : storage){
                cout << line << endl;
            }
        }

        //For saving Storage data into file
        void saveToFile(string filePath) {

            //Opening the file for writing data to the file
            ofstream File(filePath); 

            if (File.is_open()) {
                for (auto line : storage) {
                    File << line << endl;
                }
                
                File.close();
                cout << "Lines saved to file successfully" << endl;
            } 
            else {
                cout << "Not able to open file for saving data" << endl;
            }
        }

        void undo(){
            if(undoStorage.size() > 1){
                redoStorage.push_back(storage);
                // storage me purani state vapis laaege but purani state last 2nd wali hogi
                storage = undoStorage[undoStorage.size() - 2];
                undoStorage.pop_back();

                cout << "Undo SuccessFull" << endl;
            }
            else{
                cout << "Undo is Not Possible" << endl;
            }
        }

        void redo(){
            if(!redoStorage.empty()){
                undoStorage.push_back(storage);
                storage = redoStorage[redoStorage.size() - 1];
                redoStorage.pop_back();

                cout << "Redo SuccessFull" << endl;
            }
            else{
                cout << "Redo not Possible" << endl;
            }
        }

};

int main(){

    //Here Doing operations 
    TextEditor vsCode;

    vsCode.appendData("First Data");
    vsCode.appendData("Third Data");
    vsCode.displayData();

    vsCode.insertData(1, "Second Data");
    cout << endl << endl << "After Insertion on the 1st index : " << endl;
    vsCode.displayData();

    vsCode.deleteData(2);
    cout << endl << endl << "After Deletion on the 2nd index : " << endl;
    vsCode.displayData();


    //Checking edge cases
    cout << endl << endl << "Checking for invalid indexes in InsertData : " << endl;
    vsCode.insertData(-1, "This is Negative index");
    vsCode.insertData(44, "This is fourty fourth Line");

    cout << endl << endl << "Checking for invalid indexes in deleteData : " << endl;
    vsCode.deleteData(-1);
    vsCode.deleteData(11);


    //For checing the file we are just adding extra lines
    vsCode.appendData("Hero");
    vsCode.appendData("Solo leveling");
    vsCode.appendData("This is text Editor");
    vsCode.appendData("Problem Solving");
    vsCode.appendData("DSA");
    vsCode.appendData("Zero");


    cout << endl << endl << "Before Undo : " << endl;
    vsCode.displayData();
    cout << endl;


    vsCode.undo();
    vsCode.undo();
    vsCode.undo();
    vsCode.undo();
    vsCode.undo();
    vsCode.undo();


    cout << endl << endl << "After Undo : ";
    vsCode.displayData();
    cout << endl;

    vsCode.redo();
    vsCode.redo();
    vsCode.redo();
    
    cout << endl << endl << "After Redo : ";
    vsCode.displayData();

    //saving the storage lines into the File  
    string filePath = "file.txt";
    vsCode.saveToFile(filePath);

    return 0;
}