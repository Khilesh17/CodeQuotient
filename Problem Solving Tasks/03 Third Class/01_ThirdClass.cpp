#include <bits/stdc++.h>
using namespace std;

int *g1(void)
{
    int x = 10;
    return (&x);
}

int *g2(void)
{
    int *px;
    *px = 10;
    return px;
}

int *g3(void)
{
    int *px;
    px = (int *)malloc(sizeof(int));
    *px = 10;
    return px;
}

int main()
{

    int a = 20;
    int b = 10;

    if (a > b)
        if (a == b)
        {
            cout << "Equal" << endl;
        }
        else
        {
            cout << "Nothing" << endl;
        }

    cout << "Printing g1 : "<< g1();
    cout << "Printing g2 : "<< g2();
    cout << "Printing g3 : "<< g3();

    return 0;
}

