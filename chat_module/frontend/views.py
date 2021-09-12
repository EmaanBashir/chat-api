from django.shortcuts import render
from django.views import View

class ThreadView(View):
    def get(self, request, **kwargs):
        context = {'thread_id': self.kwargs.get('thread_id')}
        return render(request, 'frontend/index.html', context=context)

    def post(self, request, **kwargs):
        context = {}
        return render(request, 'frontend/index.html')


'''
##################################################################################################################
views main wo cheez handle nhi hui wi ke agar url main thread ki jaga user id ho
ye cheez pehle wale views main thi. lekin is dafa sirf thread id ke hisaab se code 
likha hai. isi tarha get or create personal thread wali cheez bhi nhi daali. ye baad 
main karna hoga. jab search user ka feature daaloon gi
################################################################################
jwt ####
########
Manager.py ki abhi sahi se safai nhi hui
###################################################################
'''