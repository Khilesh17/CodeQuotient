#include<bits/stdc++.h>
using namespace std;

class Node {

    public:
        int data;
        Node *next;

    //constructor

    Node(int d){
        this->data = d;
        this->next = NULL;
    }

    //destructor

    ~Node(){
        int value = this->data;
        //MEMORY FREE   
        if(this->next != NULL){
            delete next;
            this->next = NULL;
        }

        cout << "Memory free for " << value << endl;
    }
};


// Insertion
void insertNodeAtHead(Node* &head, Node* &tail, int d){
    
    //empty list 
    if(head == NULL){
        Node *temp = new Node(d);
        head = temp;
        tail = temp;
    }
    else{
        // new node create
        Node *temp = new Node(d);
        temp->next = head;
        head = temp;
    }
}

void insertNodeAtTail(Node* &head, Node* &tail, int d){
    //empty list 
    if(head == NULL){
        Node *temp = new Node(d);
        head = temp;
        tail = temp;
    }
    else{
        // new node create
        Node *temp = new Node(d);
        tail->next = temp;
        tail = tail->next;
    }
}

void insertNodeAtAnyPosition(Node* &head, Node* &tail, int position, int d){

    //insert at first
    if(position == 1){
        insertNodeAtHead(head, tail, d);
        return;
    }

    Node *temp = head;
    int count = 1;

    while(count < position - 1){ //posi - 1 isliye kyki end me cnt ki value badh jaegi aur agar apneko 3rd posi pe kuch element dalna hoga tho apna temp bhi 3rd posi ko point krega tho apna new node 4th posi me insert ho jaega

        temp = temp->next;
        count++;
    }

    //insert at last

    if(temp->next == NULL){
        insertNodeAtTail(head, tail, d);
        return;
    }

    Node *nodeToInsert = new Node(d);
    nodeToInsert->next = temp->next;
    temp->next = nodeToInsert;
}


//Deletion code
void deleteNode(Node* &head, Node* &tail, int position){

    if(position == 1){  // for first position
        Node* temp = head;
        head = head->next;

        // memory free
        temp->next = NULL;
        delete temp;
    }
    else{   //For middle and last position
        Node *prev = NULL;
        Node *curr = head;
        int count = 1;

        while(count < position){
            prev = curr;
            curr = curr->next;
            count++;
        }

        prev->next = curr->next;

        // handeling tail
        if(prev->next == NULL){
            tail = prev;
        }
        //memory free
        curr->next = NULL;
        delete curr;
    }
}

void printList(Node* &head){

    if(head == NULL){
        cout << "Nothing is present in list" << endl;
        return;
    }

    Node *temp = head;

    while(temp != NULL){
        cout << temp->data << " ";
        temp = temp->next;
    }

    cout << endl;
}




int main(){

    Node *head = NULL;
    Node *tail = NULL;

    printList(head); // LL Khaali hai
    
    insertNodeAtTail(head,tail,3);
    insertNodeAtTail(head,tail,4);
    insertNodeAtTail(head,tail,5);
    insertNodeAtTail(head,tail,6);
    insertNodeAtTail(head,tail,7);
    insertNodeAtTail(head,tail,8);
    cout << "After Insertion at Tail : ";
    printList(head);

    insertNodeAtHead(head, tail, 2);
    insertNodeAtHead(head, tail, 1);
    cout << "After Insertion at Head : ";
    printList(head);

    //inserting node at any position
    insertNodeAtAnyPosition(head, tail, 1, 0);
    cout << "After Insertion at 1st Position : ";
    printList(head);

    insertNodeAtAnyPosition(head, tail, 10, 9);
    cout << "After Insertion at 9th Position : ";
    printList(head);

    deleteNode(head, tail, 9);
    deleteNode(head, tail, 8);
    deleteNode(head, tail, 7);
    cout << "After Deletion of some nodes : ";
    printList(head);

return 0;
}