<?php

namespace App\Controller;

use App\Entity\Blog;
use App\Entity\Comment;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route("/spa", name:"_spa")]
class CrudCommentController extends AbstractController
{
    #[Route('/comments/{id}', name: 'comment_new', methods:["POST"])]   
    public function newComment(int $id, Request $request, ManagerRegistry $doctrine): Response
    {
        $datenow = new \Datetime(date("Y-m-d"));
        $em = $doctrine->getManager();
        $blog = $em->getRepository(Blog::class)->find($id);
        $comment = new Comment();
        $comment->setAuthor($request->request->get("author"));
        $comment->setComment($request->request->get("comment"));
        $comment->setCommentDate($datenow);
        $comment->setBlog($blog);
        $em->persist($comment);
        $em->flush();

        if ($comment == []) {
            echo "array is empty";
            exit;
        };


        return $this->json("Created new comment with an id of: " . $comment->getId());
    } 
}
