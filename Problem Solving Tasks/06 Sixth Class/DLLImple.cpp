#include<iostream>
using namespace std;

class Node {
    public:
        int data;
        Node *prev;
        Node *next;

    Node(int d){
        this->data = d;
        this->next = NULL;
        this->prev = NULL;
    }

    ~Node(){
        int value = this->data;
        if(this->next != NULL){
            delete next;
            this->next = NULL;
        }
        cout << "Memory Freed for : " << value << endl;
    }
};

//traversing
void printList(Node* head){

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


//insertion
void insertAtHead(Node* &head, Node* &tail, int d){

    //empty list
    if(head == NULL){
        Node *temp = new Node(d);
        head = temp;
        tail = temp;
    }
    else{
        Node *temp = new Node(d);
        temp->next = head;
        head->prev = temp;
        head = temp;
    }
}

void insertAtTail(Node* &head, Node* &tail, int d){

    //empty list
    if(head == NULL){
        Node *temp = new Node(d);
        head = temp;
        tail = temp;
    }
    else{
        Node *temp = new Node(d);
        tail->next = temp;
        temp->prev = tail;
        tail = temp;
    }
}

void insertNodeAtAnyPosition(Node* &head, Node* &tail, int position, int d){

    if(position == 1){   //insert at first
        insertAtHead(head, tail, d);
        return;
    }

    Node *temp = head;
    int count = 1;

    while(count < position -1){
        temp = temp->next;
        count++;
    }

    if (temp->next == NULL){
        insertAtTail(head, tail, d);
        return;
    }
    
    Node *nodeToInsert = new Node(d);

    nodeToInsert->next = temp->next;
    temp->next->prev = nodeToInsert;
    temp->next = nodeToInsert;
    nodeToInsert->prev = temp;
}

// Deletion

void deleteNode(Node* &head ,Node* &tail,  int position){

    //first position
    if(position == 1){
        Node *temp = head;
        temp->next->prev = NULL;
        head = temp->next;
        temp->next = NULL;
        //memory free
        delete temp;
        return;
    }

    Node *current = head;
    Node *previous = NULL;

    int count = 1;

    while(count < position){
        previous = current;
        current = current->next;
        count++;
    }

    if(current->next == NULL){ // for last node
        previous->next = NULL;
        current->prev = NULL;
        tail = previous;
        delete current;
        return;
    }

    // Middle node
    current->prev = NULL;
    previous->next = current->next;
    current->next->prev = previous;
    current->next = NULL;

    delete current;
}

int main(){

    Node *head = NULL;
    Node *tail = NULL;

    insertAtTail(head, tail, 1);
    insertAtTail(head, tail, 2);
    insertAtTail(head, tail, 3);
    insertAtTail(head, tail, 4);
    insertAtTail(head, tail, 5);
    cout << "After Insertion at Tail : ";
    printList(head);

    insertAtHead(head, tail, 7);
    insertAtHead(head, tail, 8);
    insertAtHead(head, tail, 9);
    cout << "After Insertion at Head : ";
    printList(head);

    
    insertNodeAtAnyPosition(head, tail, 6, 69);
    cout << "After Insertion at 6st Position : ";
    printList(head);

    insertNodeAtAnyPosition(head, tail, 1, 0);
    cout << "After Insertion at 1st Position : ";
    printList(head);


    deleteNode(head, tail, 6);
    deleteNode(head, tail, 5);
    deleteNode(head, tail, 1);
    cout << "After Deletion of some nodes : ";
    printList(head);

    return 0;
}